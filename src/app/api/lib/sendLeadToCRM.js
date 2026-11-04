import { toCrmLeadPayload } from "@/app/api/lib/buildLeadPayload";
import { LEAD_SOURCE } from "@/app/api/lib/leadConfig";

const SUPABASE_WEBHOOK_URL =
  process.env.SUPABASE_WEBHOOK_URL ||
  "https://invfhqaqjyvcttppnygs.supabase.co/functions/v1/receive-lead";

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludmZocWFxanl2Y3R0cHBueWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4NTQ1NzAsImV4cCI6MjEwODQzMDU3MH0.GhZh0SG555phXYSdaP7bXPoxWN_QBhMusNJyQyDA-Rs";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://invfhqaqjyvcttppnygs.supabase.co";

/**
 * POST a lead to the central Supabase receive-lead Edge Function.
 * Call only from server routes so the anon key never reaches the browser.
 */
export async function sendLeadToCRM(payload) {
  if (!SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_ANON_KEY is not configured");
  }

  const body = toCrmLeadPayload(payload);
  console.log("Sending lead to Supabase...", body.source);

  const response = await fetch(SUPABASE_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
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
    console.error("lead CRM failed", message);
    throw new Error(typeof message === "string" ? message : "Lead send failed");
  }

  if (data?.error) {
    console.error("lead CRM failed", data.error.message || data.error);
    throw new Error(data.error.message || "Lead send failed");
  }

  console.log("lead sent to Supabase.");
  return data?.success ?? data;
}

/**
 * Fetch leads for this website only (filtered by source).
 */
export async function fetchSiteLeads({ source = LEAD_SOURCE, limit = 100 } = {}) {
  if (!SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_ANON_KEY is not configured");
  }

  const params = new URLSearchParams({
    select: "*",
    source: `eq.${source}`,
    order: "createdAt.desc",
    limit: String(limit),
  });

  const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
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

  return Array.isArray(data) ? data : [];
}

export { toCrmLeadPayload };
