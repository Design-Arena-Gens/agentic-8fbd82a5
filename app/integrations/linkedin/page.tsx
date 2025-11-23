import Link from "next/link";

export default function LinkedInIntegrationPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">LinkedIn</h1>
          <p className="text-white/70">
            Connect your LinkedIn to publish posts and attach images.
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Connect</h3>
        <p className="mt-2 text-sm text-white/70">
          OAuth credentials are required. Once connected, you can publish from the Studio.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="btn" disabled>Connect LinkedIn</button>
          <Link href="/studio" className="btn bg-white/10 hover:bg-white/20">Go to Studio</Link>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Quick Post</h3>
        <div className="mt-3 grid gap-3">
          <textarea className="textarea" placeholder="Write a quick post..." />
          <button className="btn w-fit" type="button" disabled>Publish to LinkedIn</button>
        </div>
        <p className="mt-2 text-xs text-white/60">
          Note: Connect and posting can be enabled with OAuth credentials.
        </p>
      </div>
    </div>
  );
}
