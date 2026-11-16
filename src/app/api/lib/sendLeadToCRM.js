import { toCrmLeadPayload } from "@/app/api/lib/buildLeadPayload";
import { LEAD_SOURCE } from "@/app/api/lib/leadConfig";

const SUPABASE_WEBHOOK_URL =
  process.env.SUPABASE_WEBHOOK_URL ||
  "";

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "REDACTED";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "";

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const SUPABASE_WEBHOOK_URL_2 =
  process.env.SUPABASE_WEBHOOK_URL_2 ||
  "";

const SUPABASE_ANON_KEY_2 =
  process.env.SUPABASE_ANON_KEY_2 ||
  "REDACTED";

const SUPABASE_URL_2 =
  process.env.SUPABASE_URL_2 || "";

const SUPABASE_SERVICE_ROLE_KEY_2 = process.env.SUPABASE_SERVICE_ROLE_KEY_2 || "";

async function postLeadWebhook(url, anonKey, body, label) {
  if (!anonKey) {
    throw new Error(`${label} anon key is not configured`);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify(body),
  });

  let data = null;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.error ||
      data?.message ||
      data?.raw ||
      `Lead send failed (${response.status})`;
    throw new Error(typeof message === "string" ? message : "Lead send failed");
  }

  if (data?.error) {
    throw new Error(data.error.message || "Lead send failed");
  }

  return data?.success ?? data;
}

/**
 * POST a lead to the central Supabase receive-lead Edge Function.
 * Sends to DB1 (existing) and DB2 (new) simultaneously.
 * Call only from server routes so the anon key never reaches the browser.
 */
export async function sendLeadToCRM(payload) {
  if (!SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_ANON_KEY is not configured");
  }

  const body = toCrmLeadPayload(payload);
  console.log("Sending lead to Supabase (DB1 + DB2)...", body.source);

  const [db1Result, db2Result] = await Promise.allSettled([
    postLeadWebhook(SUPABASE_WEBHOOK_URL, SUPABASE_ANON_KEY, body, "DB1"),
    SUPABASE_WEBHOOK_URL_2 && SUPABASE_ANON_KEY_2
      ? postLeadWebhook(SUPABASE_WEBHOOK_URL_2, SUPABASE_ANON_KEY_2, body, "DB2")
      : Promise.resolve({ skipped: true }),
  ]);

  if (db1Result.status === "rejected") {
    console.error("lead CRM DB1 failed", db1Result.reason);
    throw new Error(db1Result.reason?.message || "Lead send failed");
  }

  if (db2Result.status === "rejected") {
    console.error("lead CRM DB2 failed", db2Result.reason);
  } else {
    console.log("lead sent to Supabase DB2.");
  }

  console.log("lead sent to Supabase DB1.");
  return {
    db1: db1Result.value,
    db2: db2Result.status === "fulfilled" ? db2Result.value : { error: db2Result.reason?.message },
  };
}

function resolveDbConfig(db = "1") {
  if (String(db) === "2") {
    return {
      label: "DB2",
      url: SUPABASE_URL_2,
      // Reads need service/secret role — anon/publishable is blocked by RLS (returns []).
      readKey: SUPABASE_SERVICE_ROLE_KEY_2 || SUPABASE_ANON_KEY_2,
      writeKey: SUPABASE_ANON_KEY_2,
      hasServiceRole: Boolean(SUPABASE_SERVICE_ROLE_KEY_2),
    };
  }
  return {
    label: "DB1",
    url: SUPABASE_URL,
    readKey: SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY,
    writeKey: SUPABASE_ANON_KEY,
    hasServiceRole: Boolean(SUPABASE_SERVICE_ROLE_KEY),
  };
}

/**
 * Fetch leads for this website only (filtered by source).
 * db: "1" (existing) or "2" (new project)
 *
 * Important: receive-lead writes with elevated privileges, but REST SELECT with
 * anon/publishable keys is blocked by RLS and returns []. Use SUPABASE_SERVICE_ROLE_KEY(_2).
 */
export async function fetchSiteLeads({ source = LEAD_SOURCE, limit = 100, db = "1" } = {}) {
  const config = resolveDbConfig(db);

  if (!config.readKey) {
    throw new Error(`${config.label} read key is not configured`);
  }

  if (!config.hasServiceRole) {
    console.warn(
      `${config.label}: SUPABASE_SERVICE_ROLE_KEY${db === "2" ? "_2" : ""} missing — anon/publishable key cannot read leads (RLS).`,
    );
  }

  const params = new URLSearchParams({
    select: "*",
    source: `eq.${source}`,
    order: "createdAt.desc",
    limit: String(limit),
  });

  const response = await fetch(`${config.url}/rest/v1/leads?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.readKey}`,
      apikey: config.readKey,
    },
    cache: "no-store",
  });

  let data = null;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : [];
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.raw ||
      `Failed to fetch leads (${response.status})`;
    throw new Error(typeof message === "string" ? message : "Failed to fetch leads");
  }

  const rows = Array.isArray(data) ? data : [];

  // Anon/publishable keys often pass auth but RLS returns []. Surface a clear reason.
  if (!rows.length && !config.hasServiceRole) {
    throw new Error(
      `${config.label}: leads are saving, but this key cannot read them (RLS). Add SUPABASE_SERVICE_ROLE_KEY${
        String(db) === "2" ? "_2" : ""
      } to .env.local (Project Settings → API → service_role / secret key), then restart the server.`,
    );
  }

  return rows;
}

export { toCrmLeadPayload };
