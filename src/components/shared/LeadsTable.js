"use client";

import { useEffect, useState } from "react";
import { SENT_LEAD_FIELDS } from "@/app/api/lib/buildLeadPayload";

function formatLabel(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function readLeadField(lead, key) {
  if (key === "engine_capacity") return lead.engine_capacity ?? lead.engin_capacity;
  if (key === "fuel_type") return lead.fuel_type ?? lead.fuelType;
  return lead[key];
}

function formatValue(value) {
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/leads?limit=200");
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to load leads");
        }
        if (!cancelled) {
          setLeads(Array.isArray(data.leads) ? data.leads : []);
          setSource(data.source || "");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load leads");
          setLeads([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-[var(--color-text-soft)]">Loading leads…</p>;
  }

  if (error) {
    return (
      <div className="rounded border border-[var(--color-accent-red)]/40 bg-[var(--color-accent-red-soft)] px-4 py-3 text-sm text-[var(--color-accent-red)]">
        {error}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-6 text-sm text-[var(--color-text-muted)]">
        No leads found yet{source ? ` for ${source}` : ""}.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_10px_28px_var(--color-shadow)]">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-[var(--color-page-soft)] text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
          <tr>
            {SENT_LEAD_FIELDS.map((column) => (
              <th key={column} className="whitespace-nowrap border-b border-[var(--color-border)] px-3 py-3">
                {formatLabel(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const rowId = lead.id || `${lead.email}-${lead.number}-${lead.createdAt}`;
            return (
              <tr key={rowId} className="align-top text-[var(--color-text)]">
                {SENT_LEAD_FIELDS.map((column) => (
                  <td
                    key={`${rowId}-${column}`}
                    className="border-b border-[var(--color-border)] px-3 py-3 whitespace-nowrap text-[var(--color-text-muted)]"
                  >
                    {formatValue(readLeadField(lead, column))}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
