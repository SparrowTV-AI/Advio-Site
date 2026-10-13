"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";

type Item = { name: string; body: string; image: string; icon?: string };

/** Auto-cycling tab showcase (modeled on the Taylor Talent "Clients" component). */
export default function ShowcaseTabs({
  eyebrow,
  title,
  body,
  body2,
  items,
  label = "Audience",
  interval = 6000,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  body2?: string;
  items: Item[];
  label?: string;
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), interval);
    return () => clearTimeout(t);
  }, [active, paused, interval, items.length]);

  const it = items[active];

  return (
    <section className="bg-ink px-3 py-6 md:px-6">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ambient background from the active image */}
        <AnimatePresence>
          <motion.div
            key={it.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image src={it.image} alt="" fill sizes="100vw" className="scale-110 object-cover blur-2xl" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,79,245,0.35),transparent_60%),linear-gradient(to_bottom,rgba(7,20,42,0.4),rgba(5,11,22,0.9))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal><p className="eyebrow mb-5 text-cyan">{eyebrow}</p></Reveal>
            <Reveal delay={0.05}><h2 className="display text-4xl text-white md:text-6xl">{title}</h2></Reveal>
            {body && <Reveal delay={0.1}><p className="mt-6 text-lg text-muted">{body}</p></Reveal>}
          </div>

          {/* Tab row with progress lines */}
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4" role="tablist">
            {items.map((x, i) => (
              <button
                key={x.name}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="group text-left"
              >
                <span className="relative block h-px w-full bg-white/15">
                  {i === active && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="absolute inset-y-0 left-0 h-[2px] -translate-y-[0.5px] bg-lime"
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : interval / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span
                  className={`mt-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] transition-opacity md:text-base ${
                    i === active ? "text-white opacity-100" : "text-white opacity-40 group-hover:opacity-70"
                  }`}
                >
                  {x.icon && <Image src={x.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />}
                  {x.name}
                </span>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="mt-12 grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="eyebrow flex items-center gap-2 text-lime">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" /> {label} {String(active + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-5 text-5xl text-white md:text-6xl">{it.name}</h3>
                  <p className="mt-5 max-w-sm text-lg text-muted">{it.body}</p>
                </motion.div>
              </AnimatePresence>
              {body2 && <p className="mt-10 max-w-sm text-sm text-white/50">{body2}</p>}
            </div>
            <div className="relative mx-auto aspect-[9/14] w-full max-w-[340px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_-30px_rgba(59,79,245,0.6)] md:ml-auto md:mr-0">
              <AnimatePresence>
                <motion.div
                  key={it.image}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={it.image} alt={it.name} fill sizes="340px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
