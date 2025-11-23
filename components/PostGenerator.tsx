/* eslint-disable react/no-unescaped-entities */
"use client";
import { useMemo, useState } from "react";

const templates = [
  {
    id: "howto",
    name: "How-to Playbook",
    body: (company: string, topic: string, audience: string) =>
      `Most ${audience} overcomplicate ${topic}.

Here's the simple playbook we use at ${company}:

1) Diagnose: Where are you losing the most leverage?
2) Focus: Kill nice-to-haves. Double down on what compounds.
3) Systemize: Document the 20% that drives 80% of results.
4) Measure: Weekly KPIs owned by one accountable owner.
5) Iterate: Ship tiny improvements, fast.

Saving this will force better decisions next week. 
If you want my worksheets, comment "PLAYBOOK".`
  },
  {
    id: "beforeafter",
    name: "Before/After Bridge",
    body: (company: string, topic: string, audience: string) =>
      `Before: ${audience} struggle with ${topic} ? slow, manual, chaotic.
After: Clear process, faster cycles, confident outcomes.
Bridge: What changed for us at ${company}:

? A one-page operating system
? Simple success metrics
? Two automation wins
? Weekly get-better cadence

Want the template? I can share it.`
  },
  {
    id: "contrarian",
    name: "Contrarian Take",
    body: (company: string, topic: string, audience: string) =>
      `Unpopular opinion: You don't need more ${topic}. 
You need fewer, higher-quality reps.

At ${company}, we reduced volume by 40% and results improved.
We did 3 things:
? Ruthless prioritization
? Great creative, not more creative
? Tight feedback loops

Stop doing more. Start doing better.`
  }
];

function generateHashtags(topic: string, audience: string) {
  const base = [
    "#" + topic.replace(/\s+/g, ""),
    "#LinkedIn",
    "#" + audience.replace(/\s+/g, ""),
    "#B2B",
    "#growth"
  ];
  return Array.from(new Set(base.map((t) => t.toLowerCase()))).join(" ");
}

export default function PostGenerator() {
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("lead generation");
  const [audience, setAudience] = useState("founders");
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [cta, setCta] = useState("Comment 'PLAYBOOK' and I'll share the file.");

  const content = useMemo(() => {
    const t = templates.find((t) => t.id === templateId) ?? templates[0];
    return `${t.body(company || "our company", topic, audience)}

${cta}

${generateHashtags(topic, audience)}`;
  }, [company, topic, audience, templateId, cta]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <h3 className="text-lg font-semibold">Post Inputs</h3>
        <div className="mt-4 grid gap-3">
          <div>
            <label className="text-sm text-white/70">Company</label>
            <input className="input mt-1" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-white/70">Topic</label>
              <input className="input mt-1" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-white/70">Audience</label>
              <input className="input mt-1" value={audience} onChange={(e) => setAudience(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-white/70">Template</label>
              <select className="input mt-1" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-white/70">CTA</label>
              <input className="input mt-1" value={cta} onChange={(e) => setCta(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="flex gap-2">
            <button
              className="btn bg-white/10 hover:bg-white/20"
              onClick={() => navigator.clipboard.writeText(content)}
            >
              Copy
            </button>
            <a
              className="btn"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                "https://agentic-8fbd82a5.vercel.app"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Share Link
            </a>
          </div>
        </div>
        <textarea className="textarea mt-4" value={content} readOnly />
      </div>
    </div>
  );
}
