"use client";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

type Field = { key: keyof Inputs; label: string; hint: string; min: number; max: number; step: number; fmt: (n: number) => string };
type Inputs = {
  impressions: number;
  intended: number;
  eligible: number;
  fill: number;
  cpm: number;
  cost: number;
  split: number;
};

const num = (n: number) => Math.round(n).toLocaleString("en-US");
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = (n: number) => `${n}%`;

const fields: Field[] = [
  { key: "impressions", label: "Monthly ad impressions", hint: "Commercial impressions across the inventory in scope", min: 1_000_000, max: 500_000_000, step: 1_000_000, fmt: num },
  { key: "intended", label: "Inside intended audience", hint: "Share that already matches the original advertiser's audience", min: 0, max: 95, step: 1, fmt: pct },
  { key: "eligible", label: "Eligible under agreed rules", hint: "Of out-of-target impressions: permissions, technical & audience rules met", min: 0, max: 100, step: 1, fmt: pct },
  { key: "fill", label: "Fill rate", hint: "Eligible impressions matched with approved demand", min: 0, max: 100, step: 1, fmt: pct },
  { key: "cpm", label: "Realized CPM", hint: "Net price per 1,000 replacement impressions", min: 1, max: 100, step: 1, fmt: (n) => money(n) },
  { key: "cost", label: "Incremental operating costs", hint: "As a share of gross replacement revenue", min: 0, max: 80, step: 1, fmt: pct },
  { key: "split", label: "Broadcaster share of net value", hint: "Remainder to distributor — illustrative only", min: 0, max: 100, step: 5, fmt: pct },
];

export default function Calculator() {
  const [v, setV] = useState<Inputs>({ impressions: 50_000_000, intended: 60, eligible: 50, fill: 40, cpm: 25, cost: 20, split: 50 });

  const r = useMemo(() => {
    const outside = v.impressions * (1 - v.intended / 100);
    const eligible = outside * (v.eligible / 100);
    const filled = eligible * (v.fill / 100);
    const gross = (filled / 1000) * v.cpm;
    const net = gross * (1 - v.cost / 100);
    return { outside, eligible, filled, gross, net, b: net * (v.split / 100), d: net * (1 - v.split / 100) };
  }, [v]);

  const funnel = [
    { label: "All impressions", value: v.impressions, color: "bg-electric" },
    { label: "Outside intended audience", value: r.outside, color: "bg-steel" },
    { label: "Eligible", value: r.eligible, color: "bg-steel/70" },
    { label: "Filled with approved demand", value: r.filled, color: "bg-gem" },
  ];

  const query = new URLSearchParams({ source: "model", impressions: String(v.impressions), net: String(Math.round(r.net)) });

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-7 rounded-3xl border border-white/10 bg-navy p-7 md:p-10">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-semibold text-white">{f.label}</span>
              <span className="display text-xl text-gem">{f.fmt(v[f.key])}</span>
            </div>
            <p className="mb-3 mt-1 text-xs text-white/45">{f.hint}</p>
            <input
              type="range"
              className="w-full"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.key]}
              onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-gradient-to-br from-navy-3 to-navy p-7 md:p-10">
          <p className="eyebrow text-steel">Estimated monthly net value</p>
          <motion.p key={Math.round(r.net)} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="display mt-4 text-6xl text-white md:text-7xl">
            {money(r.net)}
          </motion.p>
          <p className="mt-2 text-sm text-white/50">≈ {money(r.net * 12)} per year · gross {money(r.gross)}/mo</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-xs text-white/50">Broadcaster</p>
              <p className="display mt-1 text-3xl text-gem">{money(r.b)}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-xs text-white/50">Distributor</p>
              <p className="display mt-1 text-3xl text-steel">{money(r.d)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 p-7 md:p-10">
          <p className="eyebrow mb-6 text-white/50">Impression funnel</p>
          <div className="space-y-4">
            {funnel.map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-white/70">{f.label}</span>
                  <span className="font-semibold text-white">{num(f.value)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className={`h-full rounded-full ${f.color}`}
                    animate={{ width: `${Math.max(0.5, (f.value / v.impressions) * 100)}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href={`/contact?${query}`} className="rounded-full bg-white px-6 py-4 text-center font-semibold text-ink transition-colors hover:bg-silver">
          Validate these numbers with us →
        </Link>
        <p className="text-xs leading-relaxed text-white/40">
          Illustrative estimate only — not pilot results, a forecast or a revenue claim. Actual participation and returns
          depend on agreed rights, available demand, supported delivery, operating costs and commercial terms. A pilot
          establishes the evidence.
        </p>
      </div>
    </div>
  );
}
