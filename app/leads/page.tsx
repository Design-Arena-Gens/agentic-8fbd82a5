import LeadTable from "@/components/LeadTable";

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-white/70">
            Import LinkedIn exports (or any CSV), deduplicate, score, and export.
          </p>
        </div>
      </div>
      <LeadTable />
    </div>
  );
}
