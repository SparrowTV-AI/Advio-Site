"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/Section";

type NodeId = "broadcasters" | "advio" | "distributors";

export type EcosystemNode = {
  id: NodeId;
  label: string;
  image?: string;
  brings: string;
  gets: string;
};

// Ring geometry in a 100×100 viewBox. Broadcasters and distributors sit on the ring;
// Advio sits at the center. There are no straight connectors, so nothing reads as a
// left-to-right pipeline: value circulates around the loop and grows out of the hub.
const C = 50;
const R = 36;
const LOOP_CW = `M ${C - R} ${C} A ${R} ${R} 0 1 1 ${C + R} ${C} A ${R} ${R} 0 1 1 ${C - R} ${C}`;
const LOOP_CCW = `M ${C - R} ${C} A ${R} ${R} 0 1 0 ${C + R} ${C} A ${R} ${R} 0 1 0 ${C - R} ${C}`;

const POS: Record<NodeId, { left: string; top: string; size: string }> = {
  broadcasters: { left: `${C - R}%`, top: `${C}%`, size: "w-[27%]" },
  distributors: { left: `${C + R}%`, top: `${C}%`, size: "w-[27%]" },
  advio: { left: `${C}%`, top: `${C}%`, size: "w-[30%]" },
};

export default function EcosystemLoop({
  eyebrow,
  title,
  body,
  nodes,
}: {
  eyebrow: string;
  title: string;
  body: string;
  nodes: EcosystemNode[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<NodeId>("advio");
  const current = nodes.find((n) => n.id === active) ?? nodes[0];

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_55%,var(--modern-a),transparent_55%)] opacity-60" />
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} />

        <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Loop */}
          <div className="relative mx-auto aspect-square w-full max-w-[640px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <filter id="eco-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.9" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="eco-hub" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--gem, #4f7bff)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="var(--gem, #4f7bff)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Base ring + faint inner ring */}
              <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth="0.5" />
              <circle cx={C} cy={C} r={R - 7} fill="none" stroke="var(--line)" strokeWidth="0.25" strokeDasharray="0.6 1.4" />

              {/* Rotating highlight arcs: one each way, so value moves in both directions */}
              {!reduce && (
                <>
                  <g style={{ transformOrigin: "50px 50px", animation: "eco-spin 14s linear infinite" }}>
                    <circle cx={C} cy={C} r={R} fill="none" stroke="var(--cyan)" strokeWidth="0.7" strokeLinecap="round" strokeDasharray={`${R * 1.1} ${R * 5.2}`} filter="url(#eco-glow)" opacity="0.9" />
                  </g>
                  <g style={{ transformOrigin: "50px 50px", animation: "eco-spin 14s linear infinite reverse" }}>
                    <circle cx={C} cy={C} r={R} fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeLinecap="round" strokeDasharray={`${R * 0.7} ${R * 5.6}`} filter="url(#eco-glow)" opacity="0.7" />
                  </g>
                </>
              )}

              {/* Particles circulating the loop */}
              {!reduce &&
                [0, 1, 2, 3].map((i) => (
                  <g key={i}>
                    <circle r="0.75" fill="var(--mist)" filter="url(#eco-glow)">
                      <animateMotion dur="9s" begin={`${i * -2.25}s`} repeatCount="indefinite" path={LOOP_CW} />
                    </circle>
                    <circle r="0.55" fill="var(--cyan)" filter="url(#eco-glow)">
                      <animateMotion dur="11s" begin={`${i * -2.75}s`} repeatCount="indefinite" path={LOOP_CCW} />
                    </circle>
                  </g>
                ))}

              {/* Hub glow + growth pulses: the "something bigger" moment */}
              <circle cx={C} cy={C} r="22" fill="url(#eco-hub)" />
              {!reduce &&
                [0, 1, 2].map((i) => (
                  <circle key={i} cx={C} cy={C} r="15" fill="none" stroke="var(--cyan)" strokeWidth="0.35" style={{ transformOrigin: "50px 50px", animation: `eco-grow 4.5s ease-out ${i * 1.5}s infinite` }} />
                ))}
            </svg>

            {/* Nodes (real buttons, positioned over the SVG) */}
            {nodes.map((n) => {
              const p = POS[n.id];
              const on = n.id === active;
              const hub = n.id === "advio";
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setActive(n.id)}
                  onMouseEnter={() => setActive(n.id)}
                  aria-pressed={on}
                  aria-controls="eco-panel"
                  className={`group absolute ${p.size} -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan`}
                  style={{ left: p.left, top: p.top }}
                >
                  <span
                    className={`${n.image ? "force-dark" : ""} relative block aspect-square overflow-hidden rounded-full border transition-[box-shadow,border-color,transform] duration-500 ${
                      on ? "scale-105 border-cyan shadow-[0_0_0_6px_var(--modern-b),0_0_60px_var(--modern-a)]" : "border-line group-hover:border-cyan/60"
                    } ${hub ? "bg-navy" : "bg-navy-2"}`}
                  >
                    {n.image ? (
                      <>
                        <Image src={n.image} alt="" fill sizes="(min-width: 1024px) 180px, 28vw" className={`object-cover transition-[filter,transform] duration-700 ${on ? "scale-105 saturate-100" : "saturate-[0.35] brightness-75"}`} />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                      </>
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Image src="/brand/advio-symbol.svg" alt="" width={52} height={64} className="w-[28%]" />
                      </span>
                    )}
                    <span className={`absolute inset-x-0 px-[14%] text-center font-semibold leading-tight text-white ${hub ? "bottom-[16%] text-[clamp(0.7rem,1.6vw,1rem)]" : "bottom-[14%] text-[clamp(0.7rem,1.5vw,0.95rem)]"}`}>
                      {n.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div id="eco-panel" aria-live="polite" className="relative min-h-[18rem] rounded-[1.75rem] border border-line bg-navy/60 p-8 backdrop-blur md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="display text-4xl text-white md:text-5xl">{current.label}</h3>
                <dl className="mt-8 space-y-6">
                  <div>
                    <dt className="text-sm font-semibold text-cyan">Brings</dt>
                    <dd className="mt-1.5 text-lg leading-relaxed text-white/85">{current.brings}</dd>
                  </div>
                  <div className="border-t border-line pt-6">
                    <dt className="text-sm font-semibold text-cyan">Gains</dt>
                    <dd className="mt-1.5 text-lg leading-relaxed text-white/85">{current.gets}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2" role="group" aria-label="Choose a partner">
              {nodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setActive(n.id)}
                  aria-label={n.label}
                  aria-pressed={n.id === active}
                  className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan ${n.id === active ? "w-10 bg-cyan" : "w-5 bg-line hover:bg-cyan/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
