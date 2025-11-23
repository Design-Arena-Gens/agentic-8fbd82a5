import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LinkedIn Creator Agent",
  description:
    "Generate viral LinkedIn posts, images, and manage leads in one place."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
              <span className="text-lg font-semibold">
                Creator Agent
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/studio" className="btn">Post Studio</Link>
              <Link href="/leads" className="btn bg-white/10 hover:bg-white/20">Leads</Link>
              <Link href="/integrations/linkedin" className="btn bg-white/10 hover:bg-white/20">LinkedIn</Link>
              <a href="https://agentic-8fbd82a5.vercel.app" target="_blank" className="btn bg-white/10 hover:bg-white/20">Live</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mt-16 border-t border-white/10 bg-black/10">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/60">
            Built for engaged, data-driven LinkedIn growth.
          </div>
        </footer>
      </body>
    </html>
  );
}
