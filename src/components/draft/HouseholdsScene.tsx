"use client";
import { useRef, useState } from "react";
import { DRAFT } from "@/lib/draft";
import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "motion/react";

const COLS = 25;
const ROWS = 8;
const TOTAL = COLS * ROWS; // each dot ≈ 5 households
// deterministic pseudo-random order so the split looks organic
const order = Array.from({ length: TOTAL }, (_, i) => i).sort(
  (a, b) => ((a * 7919) % 211) - ((b * 7919) % 211)
);
const rank = new Map(order.map((v, i) => [v, i]));

const steps = [
  {
    eyebrow: "Today",
    title: "One commercial.",
    body: "Linear television generally delivers the same commercial to every household — 1,000 homes, one ad.",
    stat: "1,000",
    label: "households, same ad",
  },
  {
    eyebrow: "Intended audience",
    title: "Some homes fit the plan.",
    body: "600 households match the original advertiser's intended audience. Their commercial stays exactly as agreed.",
    stat: "600",
    label: "receive the original ad",
  },
  {
    eyebrow: "Different needs",
    title: "Others don't.",
    body: "400 households sit outside the intended audience. Today, that delivery is simply absorbed.",
    stat: "400",
    label: "outside the intended audience",
  },
  {
    eyebrow: "Selective opportunity",
    title: "That's the opening.",
    body: "Where permissions, demand, audience rules and technical conditions qualify, those impressions can be evaluated for an approved opportunity.",
    stat: "+",
    label: "eligible impressions, evaluated",
  },
];

function colorFor(step: number, r: number) {
  const intended = r < TOTAL * 0.6;
  const eligible = !intended && r % 2 === 0;
  if (step === 0) return "var(--dot-base)";
  if (step === 1) return intended ? "var(--dot-intended)" : "var(--dot-dim)";
  if (step === 2) return intended ? "var(--dot-intended-dim)" : "var(--dot-outside)";
  return intended ? "var(--dot-intended-dim)" : eligible ? "var(--dot-eligible)" : "var(--dot-ineligible)";
}

export default function HouseholdsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(3, Math.floor(v * 4.2))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const s = steps[step];

  return (
    <section ref={ref} className="relative h-[420vh]">
      <div className="bg-modern sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {DRAFT === 1 && (
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_50%_55%,black,transparent_72%)]" />
        )}
        <div className="relative mx-auto w-full max-w-6xl px-5 pt-16 md:px-10">
          {/* Header on top */}
          <p className="eyebrow mb-4 text-steel">The opportunity</p>
          <h2 className="display max-w-4xl text-3xl text-white md:text-5xl">
            Not every household matches the advertiser&apos;s <span className="text-silver">intended audience.</span>
          </h2>

          {/* Step caption */}
          <div className="mt-6 min-h-[110px] md:mt-8 md:min-h-[96px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10"
              >
                <div>
                  <p className="text-xl font-semibold text-white md:text-2xl">
                    <span className="mr-2 text-steel">{s.eyebrow} ·</span>
                    {s.title}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{s.body}</p>
                </div>
                <div className="flex shrink-0 items-baseline gap-3">
                  <span className="display text-4xl text-silver md:text-6xl">{s.stat}</span>
                  <span className="max-w-[9rem] text-xs text-white/60">{s.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Squares below the header */}
          <div
            className="mt-6 grid gap-1 md:gap-1.5"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            aria-hidden
          >
            {Array.from({ length: TOTAL }, (_, i) => {
              const r = rank.get(i)!;
              return (
                <span
                  key={i}
                  className="aspect-square rounded-[3px] transition-all duration-700"
                  style={{
                    background: colorFor(step, r),
                    transitionDelay: `${(r % 40) * 12}ms`,
                    boxShadow: step === 3 && r >= TOTAL * 0.6 && r % 2 === 0 ? "0 0 14px rgba(36,87,255,0.85)" : "none",
                  }}
                />
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60">
            <Legend c="var(--dot-intended)" t="Intended audience" />
            <Legend c="var(--dot-outside)" t="Outside intended audience" />
            <Legend c="var(--dot-eligible)" t="Eligible opportunity" />
          </div>
          <p className="mt-3 text-xs text-white/35">
            Illustration only — 1,000 households. Not a revenue claim. Out-of-target does not automatically mean eligible.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/5">
          <motion.div style={{ width: bar }} className="h-full bg-gem" />
        </div>
      </div>
    </section>
  );
}

function Legend({ c, t }: { c: string; t: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
      {t}
    </span>
  );
}
