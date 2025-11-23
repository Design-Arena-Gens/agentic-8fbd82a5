import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Generate viral LinkedIn posts and turn attention into leads
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          An end-to-end creator agent: craft posts, create diagrams and images,
          and manage captured leads ? ready to publish to LinkedIn.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/studio" className="btn text-base px-6 py-3">
            Open Post Studio
          </Link>
          <Link
            href="/leads"
            className="btn text-base px-6 py-3 bg-white/10 hover:bg-white/20"
          >
            Manage Leads
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <h3 className="text-lg font-semibold">Post Generator</h3>
          <p className="mt-2 text-sm text-white/70">
            Generate scroll-stopping hooks, formats, and CTAs with data-backed
            templates optimized for engagement.
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Diagram & Image Builder</h3>
          <p className="mt-2 text-sm text-white/70">
            Create charts and visuals in seconds. Export as crisp PNG to attach
            to your posts.
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Lead Manager</h3>
          <p className="mt-2 text-sm text-white/70">
            Import CSV, deduplicate, auto-score, and tag ? then export for your
            CRM.
          </p>
        </div>
      </section>
    </div>
  );
}
