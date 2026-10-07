import LeadsTable from "@/components/shared/LeadsTable";
import { LEAD_SOURCE } from "@/app/api/lib/leadConfig";

export const metadata = {
  title: "Leads",
  description: `Leads submitted from ${LEAD_SOURCE}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function LeadsPage() {
  return (
    <main className="mx-auto w-full max-w-8xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)] md:text-3xl">Website Leads</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Showing leads where <code className="font-semibold">source</code> is{" "}
          <span className="font-semibold text-[var(--color-primary)]">{LEAD_SOURCE}</span>.
        </p>
      </div>
      <LeadsTable />
    </main>
  );
}
