import { fetchSiteLeads } from "@/app/api/lib/sendLeadToCRM";
import { LEAD_SOURCE } from "@/app/api/lib/leadConfig";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || 100);
    const source = searchParams.get("source") || LEAD_SOURCE;

    const leads = await fetchSiteLeads({
      source,
      limit: Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 500) : 100,
    });

    return Response.json({ success: true, source, leads });
  } catch (error) {
    console.error("fetch leads failed", error);
    return Response.json(
      { success: false, error: error.message || "Failed to fetch leads" },
      { status: 502 },
    );
  }
}
