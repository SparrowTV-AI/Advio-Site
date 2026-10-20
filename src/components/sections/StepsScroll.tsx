"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useIsDesktop } from "@/lib/useIsDesktop";

type Step = { n?: string; title: string; body: string; icon?: string };

/**
 * Desktop: pinned scroll scene where steps light up one by one.
 * Phones: the cards stack too tall to pin in one screen, so they scroll normally
 * and fade in as each one arrives. Every step stays reachable.
 */
export default function StepsScroll({ eyebrow, title, body, steps, id }: { eyebrow: string; title: string; body?: string; steps: Step[]; id?: string }) {
  const desktop = useIsDesktop();
  return desktop ? (
    <PinnedSteps eyebrow={eyebrow} title={title} body={body} steps={steps} id={id} />
  ) : (
    <section id={id} className="relative scroll-mt-20 bg-mist py-20 text-ink">
      <div className="mx-auto w-full max-w-7xl px-5">
        <Heading eyebrow={eyebrow} title={title} body={body} />
        <div className="mt-10 grid gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[1.75rem] bg-ink p-7 text-white shadow-[0_20px_60px_-30px_rgba(7,27,58,0.35)]"
            >
              <CardBody s={s} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Heading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <>
      <p className="eyebrow mb-5 text-electric">{eyebrow}</p>
      <h2 className="display max-w-4xl text-4xl md:text-6xl">{title}</h2>
      {body && <p className="mt-6 max-w-2xl text-lg text-ink/70">{body}</p>}
    </>
  );
}

function PinnedSteps({ eyebrow, title, body, steps, id }: { eyebrow: string; title: string; body?: string; steps: Step[]; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section id={id} ref={ref} className="relative scroll-mt-20 bg-mist text-ink" style={{ height: `${100 + steps.length * 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
          <Heading eyebrow={eyebrow} title={title} body={body} />
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-0 h-[3px] rounded-full bg-ink/10">
              <motion.div style={{ width: bar }} className="h-full rounded-full bg-electric" />
            </div>
            <div className="grid gap-6 pt-10 md:grid-cols-3">
              {steps.map((s, i) => (
                <StepCard key={s.title} s={s} i={i} total={steps.length} p={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardBody({ s, i }: { s: Step; i: number }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="display text-sm opacity-50">{s.n ?? String(i + 1).padStart(2, "0")}</span>
        {s.icon && (
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#a7bcff]">
            <Image src={s.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          </span>
        )}
      </div>
      <h3 className="display mt-8 text-3xl md:text-5xl">{s.title}</h3>
      <p className="mt-5 text-lg leading-relaxed opacity-75">{s.body}</p>
    </>
  );
}

function StepCard({ s, i, total, p }: { s: Step; i: number; total: number; p: MotionValue<number> }) {
  const start = 0.1 + (i / total) * 0.8;
  const a = Math.max(0, start - 0.08);
  const opacity = useTransform(p, [a, start], [0.25, 1]);
  const y = useTransform(p, [a, start], [30, 0]);
  // Theme-aware: the section is light in the dark theme and dark in the light theme, so the idle card
  // uses --paper and the active card fades in a --ink overlay (a CSS-variable color can't be interpolated).
  const active = useTransform(p, [start - 0.02, start + 0.02], [0, 1]);
  return (
    <motion.div style={{ opacity, y }} className="relative rounded-[1.75rem] bg-paper p-8 text-ink shadow-[0_20px_60px_-30px_rgba(7,27,58,0.35)] md:p-10">
      <CardBody s={s} i={i} />
      <motion.div aria-hidden style={{ opacity: active }} className="absolute inset-0 rounded-[1.75rem] bg-ink p-8 text-white md:p-10">
        <CardBody s={s} i={i} />
      </motion.div>
    </motion.div>
  );
}
