"use client";
import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";

type Lead = {
  name: string;
  title: string;
  company: string;
  email?: string;
  linkedin?: string;
  score?: number;
  tags?: string[];
};

function normalizeHeader(h: string) {
  return h.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function mapRow(row: Record<string, any>): Lead {
  const keys = Object.fromEntries(Object.keys(row).map((k) => [normalizeHeader(k), k]));
  const get = (n: string) => row[keys[n]] ?? "";
  const name = get("name") || `${get("firstname")} ${get("lastname")}`.trim();
  return {
    name,
    title: get("title") || get("jobtitle"),
    company: get("company") || get("organization"),
    email: get("email") || get("emailaddress"),
    linkedin: get("linkedin") || get("linkedinurl") || get("profileurl"),
  };
}

function scoreLead(lead: Lead): number {
  let score = 0;
  const senior = /(head|lead|director|vp|chief|founder|owner|principal)/i;
  if (senior.test(lead.title)) score += 25;
  if (/growth|marketing|sales|revenue/i.test(lead.title)) score += 20;
  if (/cto|product|engineering/i.test(lead.title)) score += 10;
  if (lead.company && lead.company.length > 2) score += 5;
  if (lead.email) score += 10;
  if (lead.linkedin) score += 10;
  score += Math.min(20, Math.max(0, (lead.name?.length || 0) - 8));
  return Math.min(100, score);
}

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("leads");
    if (saved) setLeads(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  function onFile(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rows = (res.data as any[]).map(mapRow);
        const dedup = new Map<string, Lead>();
        for (const r of rows) {
          const key = (r.email || r.linkedin || `${r.name}-${r.company}`).toLowerCase();
          if (!dedup.has(key)) {
            dedup.set(key, { ...r, score: scoreLead(r) });
          }
        }
        setLeads(Array.from(dedup.values()));
      }
    });
  }

  function exportCsv() {
    const csv = Papa.unparse(
      leads.map((l) => ({
        name: l.name,
        title: l.title,
        company: l.company,
        email: l.email || "",
        linkedin: l.linkedin || "",
        score: l.score || 0
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const shown = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return leads;
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(f) ||
        (l.title || "").toLowerCase().includes(f) ||
        (l.company || "").toLowerCase().includes(f) ||
        (l.email || "").toLowerCase().includes(f)
    );
  }, [leads, filter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <label className="btn bg-white/10 hover:bg-white/20 cursor-pointer">
            Import CSV
            <input type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files && onFile(e.target.files[0])} />
          </label>
          <button className="btn" onClick={exportCsv}>Export CSV</button>
        </div>
        <input className="input" placeholder="Filter leads..." value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Name</th>
              <th className="px-3 py-2 text-left font-medium">Title</th>
              <th className="px-3 py-2 text-left font-medium">Company</th>
              <th className="px-3 py-2 text-left font-medium">Email</th>
              <th className="px-3 py-2 text-left font-medium">LinkedIn</th>
              <th className="px-3 py-2 text-left font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((l, i) => (
              <tr key={i} className="odd:bg-white/5">
                <td className="px-3 py-2">{l.name}</td>
                <td className="px-3 py-2">{l.title}</td>
                <td className="px-3 py-2">{l.company}</td>
                <td className="px-3 py-2">{l.email}</td>
                <td className="px-3 py-2">
                  {l.linkedin ? (
                    <a className="text-brand-300 hover:underline" href={l.linkedin} target="_blank">
                      Profile
                    </a>
                  ) : (
                    <span className="text-white/40">?</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <span className="inline-flex min-w-[2.5rem] justify-center rounded-md bg-brand-600/20 px-2 py-1 text-brand-200">
                    {l.score ?? 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
