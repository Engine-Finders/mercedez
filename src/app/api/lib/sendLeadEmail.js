import { Resend } from "resend";
import { LEAD_SOURCE } from "@/app/api/lib/leadConfig";
import { SENT_LEAD_FIELDS, toCrmLeadPayload } from "@/app/api/lib/buildLeadPayload";

/** Hardcoded inbox — do not move to env. */
const LEAD_TO_EMAIL = "ef2crm@gmail.com";
/** Verified Resend sending domain. */
const LEAD_FROM_EMAIL = "Mercedes Engines UK <leads@mercedesengines.uk>";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatLabel(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value) {
  if (value === undefined || value === null || String(value).trim() === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;font-size:13px;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;font-size:14px;font-weight:600;white-space:pre-wrap;">${escapeHtml(formatValue(value))}</td>
  </tr>`;
}

function buildCalculatorSection(calculator) {
  if (!calculator || typeof calculator !== "object") return "";

  const rows = Object.entries(calculator)
    .map(([key, value]) => row(formatLabel(key), value))
    .join("");

  return `
          <h2 style="margin:20px 0 10px;font-size:15px;color:#b07526;text-transform:uppercase;letter-spacing:0.04em;">Diagnostic Calculator</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;">
            ${rows}
          </table>`;
}

function buildLeadEmailHtml(payload = {}) {
  const crmPayload = toCrmLeadPayload(payload);
  const fieldRows = SENT_LEAD_FIELDS.map((key) => row(formatLabel(key), crmPayload[key])).join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:20px 24px;background:#111111;color:#ffffff;">
          <h1 style="margin:0;font-size:20px;">New quote request</h1>
          <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Lead from ${escapeHtml(crmPayload.source || LEAD_SOURCE)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px;">
          <h2 style="margin:0 0 10px;font-size:15px;color:#b07526;text-transform:uppercase;letter-spacing:0.04em;">Lead Details</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;margin-bottom:20px;">
            ${fieldRows}
          </table>
          ${buildCalculatorSection(payload.calculator)}
          <p style="font-size:11px;color:#888;margin-top:20px;">Timestamp: ${new Date().toUTCString()}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Notify ops that a customer requested a quote.
 * Always sends to the hardcoded ops inbox — never emails the customer.
 */
export async function sendLeadEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const customerEmail = String(payload?.email || "").trim();
  const resend = new Resend(apiKey);
  const vrm = payload?.vehicle_vrm || payload?.vehicle_reg
    ? String(payload.vehicle_vrm || payload.vehicle_reg).toUpperCase()
    : "unknown";
  const fromCalc = payload?.calculator ? " · calculator" : "";
  const subject = `New quote · ${payload?.name || "Lead"} · ${vrm}${fromCalc} · ${payload?.source || LEAD_SOURCE}`;

  const { data, error } = await resend.emails.send({
    from: LEAD_FROM_EMAIL,
    to: [LEAD_TO_EMAIL],
    ...(customerEmail ? { replyTo: customerEmail } : {}),
    subject,
    html: buildLeadEmailHtml(payload),
  });

  if (error) {
    console.error("lead email failed", error);
    throw new Error(error.message || "Failed to send lead email");
  }

  console.log("lead email sent to", LEAD_TO_EMAIL, data?.id || "");
  return data;
}
