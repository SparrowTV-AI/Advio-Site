"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/Section";

type Item = { title: string; body: string; image?: string; icon?: string };

/** Auto-rotating split card (modeled on the Taylor Talent "Why Taylor Talent" component). */
export default function FeatureSlides({
  eyebrow,
  title,
  items,
  interval = 7000,
  tone = "dark",
  backdrop,
}: {
  eyebrow: string;
  title: string;
  items: Item[];
  backdrop?: string;
  interval?: number;
  tone?: "dark" | "light";
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), interval);
    return () => clearTimeout(t);
  }, [active, playing, interval, items.length]);

  const it = items[active];
  const light = tone === "light";

  return (
    <section className={`${light ? "bg-mist" : "bg-ink"} py-24 md:py-32`}>
      <Container>
        <SectionHeading tone={tone} eyebrow={eyebrow} title={title} />
        <div className={`mt-14 grid overflow-hidden rounded-[2rem] border md:grid-cols-[1fr_1.35fr] ${light ? "border-ink/10 bg-white" : "border-white/10 bg-navy"}`}>
          <div className={`flex min-h-[330px] flex-col justify-between p-6 md:min-h-[420px] md:p-12 ${light ? "" : ""}`}>
            <div>
              <p className={`eyebrow ${light ? "text-electric" : "text-cyan"}`}>
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className={`display mt-4 text-3xl md:mt-6 md:text-5xl ${light ? "text-ink" : "text-white"}`}>{it.title}</h3>
                  <p className={`mt-3 max-w-md text-base leading-relaxed md:mt-5 md:text-lg ${light ? "text-ink/70" : "text-muted"}`}>{it.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center gap-3 md:mt-10">
              <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-2 ${light ? "bg-ink/5" : "bg-white/5"}`}>
                {items.map((x, i) => (
                  <button
                    key={x.title}
                    aria-label={`Show ${x.title}`}
                    onClick={() => setActive(i)}
                    className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                      i === active ? "w-10" : "w-1.5"
                    } ${light ? "bg-ink/20" : "bg-white/25"}`}
                  >
                    {i === active && (
                      <motion.span
                        key={`${active}-${playing}`}
                        className={`absolute inset-y-0 left-0 rounded-full ${light ? "bg-electric" : "bg-lime"}`}
                        initial={{ width: playing ? "0%" : "100%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: playing ? interval / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className={`grid h-9 w-9 place-items-center rounded-full ${light ? "bg-ink/5 text-ink" : "bg-white/5 text-white"}`}
              >
                {playing ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="0" width="3" height="10" rx="1" /><rect x="6" y="0" width="3" height="10" rx="1" /></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M2 0l8 5-8 5z" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className="relative min-h-[200px] overflow-hidden md:min-h-[520px]">
            {backdrop && (
              <>
                <Image src={backdrop} alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="scale-105 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-ink/50 to-electric/30" />
              </>
            )}
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {it.icon ? (
                  <div className="grid h-full w-full place-items-center">
                    <div className="grid h-36 w-36 place-items-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_120px_rgba(135,163,255,0.25)] backdrop-blur-md md:h-64 md:w-64">
                      <Image src={it.icon} alt="" width={140} height={140} className="h-16 w-16 object-contain invert md:h-32 md:w-32" />
                    </div>
                  </div>
                ) : it.image ? (
                  <Image src={it.image} alt={it.title} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-navy-3 to-electric/40" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
