"use client";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useMemo, useRef, useState } from "react";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

type ChartType = "bar" | "doughnut" | "line";

function parseCSV(text: string): { labels: string[]; values: number[] } {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return { labels: [], values: [] };
  const labels: string[] = [];
  const values: number[] = [];
  for (const line of lines) {
    const [label, value] = line.split(",");
    labels.push(label);
    values.push(Number(value));
  }
  return { labels, values };
}

export default function DiagramBuilder() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [title, setTitle] = useState("Lead Growth");
  const [csv, setCsv] = useState("Jan,10\nFeb,18\nMar,25\nApr,39\nMay,58\nJun,77");
  const canvasRef = useRef<HTMLDivElement>(null);

  const { labels, values } = useMemo(() => parseCSV(csv), [csv]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: "rgba(99, 102, 241, 0.6)",
          borderColor: "rgba(99, 102, 241, 1)",
          borderWidth: 2
        }
      ]
    }),
    [labels, values, title]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: chartType === "doughnut" ? {} : {
        x: { grid: { color: "rgba(255,255,255,0.08)" } },
        y: { grid: { color: "rgba(255,255,255,0.08)" } }
      }
    }),
    [chartType]
  );

  async function downloadPng() {
    const container = canvasRef.current;
    if (!container) return;
    const canvas = container.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.click();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <h3 className="text-lg font-semibold">Diagram Inputs</h3>
        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-white/70">Title</label>
              <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-white/70">Chart Type</label>
              <select className="input mt-1" value={chartType} onChange={(e) => setChartType(e.target.value as ChartType)}>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="doughnut">Doughnut</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm text-white/70">CSV (label,value)</label>
            <textarea className="textarea mt-1" value={csv} onChange={(e) => setCsv(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Preview</h3>
          <button className="btn" onClick={downloadPng}>Download PNG</button>
        </div>
        <div ref={canvasRef} className="mt-4">
          {chartType === "bar" && <Bar data={data} options={options as any} />}
          {chartType === "line" && <Line data={data} options={options as any} />}
          {chartType === "doughnut" && <Doughnut data={data} options={options as any} />}
        </div>
      </div>
    </div>
  );
}
