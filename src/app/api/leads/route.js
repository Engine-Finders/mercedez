import { fetchSiteLeads } from "@/app/api/lib/sendLeadToCRM";
import { LEAD_SOURCE } from "@/app/api/lib/leadConfig";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || 100);
    const source = searchParams.get("source") || LEAD_SOURCE;
    const db = searchParams.get("db") === "2" ? "2" : "1";

    const leads = await fetchSiteLeads({
      source,
      db,
      limit: Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 500) : 100,
    });

    return Response.json({ success: true, source, db, leads });
  } catch (error) {
    console.error("fetch leads failed", error);
    return Response.json(
      { success: false, error: error.message || "Failed to fetch leads" },
      { status: 502 },
    );
  }
}
