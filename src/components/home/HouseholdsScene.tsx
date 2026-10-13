"use client";
import { useRef, useState } from "react";
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
    eyebrow: "The opportunity",
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
  if (step === 0) return "#8a96ad";
  if (step === 1) return intended ? "#dfe5ef" : "#26334d";
  if (step === 2) return intended ? "#3a4763" : "#9fb4ff";
  return intended ? "#3a4763" : eligible ? "#4f7bff" : "#55658a";
}

export default function HouseholdsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(3, Math.floor(v * 4.2))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const s = steps[step];

  return (
    <section ref={ref} className="relative h-[420vh] bg-navy">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(79,123,255,0.18),transparent_60%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:grid-cols-[1fr_1.25fr] md:px-10">
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="eyebrow mb-5 text-steel">{s.eyebrow}</p>
                <h2 className="display text-5xl text-white md:text-7xl">{s.title}</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{s.body}</p>
                <div className="mt-10 flex items-baseline gap-4">
                  <span className="display text-6xl text-gem md:text-7xl">{s.stat}</span>
                  <span className="text-sm text-white/60">{s.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div
              className="grid gap-1.5 md:gap-2"
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
                      boxShadow: step === 3 && r >= TOTAL * 0.6 && r % 2 === 0 ? "0 0 14px rgba(79,123,255,0.85)" : "none",
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60">
              <Legend c="#dfe5ef" t="Intended audience" />
              <Legend c="#9fb4ff" t="Outside intended audience" />
              <Legend c="#4f7bff" t="Eligible opportunity" />
            </div>
            <p className="mt-4 text-xs text-white/35">
              Illustration only — 1,000 households. Not pilot results or a revenue claim. Out-of-target does not
              automatically mean eligible.
            </p>
          </div>
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
