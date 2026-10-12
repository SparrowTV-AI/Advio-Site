"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

/** Apple-style pinned scene: the two businesses slide together and ADVIO locks in between. */
export default function ConnectionScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const leftX = useTransform(p, [0, 0.45], ["-70%", "0%"]);
  const rightX = useTransform(p, [0, 0.45], ["70%", "0%"]);
  const midY = useTransform(p, [0.35, 0.6], ["-120%", "0%"]);
  const midO = useTransform(p, [0.35, 0.5], [0, 1]);
  const tilt = useTransform(p, [0, 1], [28, 8]);
  const glow = useTransform(p, [0.55, 0.7], [0, 1]);
  const scale = useTransform(p, [0.7, 1], [1, 0.92]);

  return (
    <section id="connection" ref={ref} className="relative h-[380vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(92,225,230,0.12),transparent_60%)]" />

        <div className="relative z-10 mb-10 h-40 w-full max-w-4xl px-5 text-center md:mb-16">
          <Caption p={p} range={[0, 0.08, 0.28, 0.36]} eyebrow="The connection that creates opportunity">
            Different businesses.
          </Caption>
          <Caption p={p} range={[0.36, 0.42, 0.62, 0.7]} eyebrow="ADVIO">
            The piece that changes the picture.
          </Caption>
          <Caption p={p} range={[0.7, 0.76, 0.98, 1]} eyebrow="Shared opportunity" lime>
            A shared path to incremental value.
          </Caption>
        </div>

        <motion.div style={{ rotateX: tilt, scale, transformPerspective: 1400 }} className="relative w-full max-w-6xl px-5">
          <div className="relative flex items-stretch justify-center">
            <motion.div style={{ x: leftX }} className="z-10 w-[38%]">
              <Block
                label="Broadcasters"
                title="Premium inventory. Commercial authority."
                body="Authorize eligible inventory. Establish advertiser rules. Define what value means for your business."
                gradient="from-navy-3 to-navy-2"
              />
            </motion.div>
            <motion.div style={{ y: midY, opacity: midO }} className="z-20 -mx-3 w-[28%]">
              <div className="relative h-full rounded-3xl bg-gradient-to-br from-cyan via-cyan to-lime p-px shadow-[0_30px_80px_-20px_rgba(92,225,230,0.6)]">
                <div className="flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-cyan/90 to-lime/90 p-5 text-ink md:p-8">
                  <p className="eyebrow text-[10px] md:text-xs">ADVIO</p>
                  <p className="display text-xl md:text-4xl">The intelligence that connects.</p>
                  <ul className="hidden space-y-1 text-sm font-medium md:block">
                    <li>Eligibility</li>
                    <li>Activation</li>
                    <li>Measurement</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div style={{ x: rightX }} className="z-10 w-[38%]">
              <Block
                label="Distributors"
                title="Audience delivery. Network capability."
                body="Enable supported delivery. Establish integration requirements. Define commercial participation."
                gradient="from-electric/70 to-navy-3"
              />
            </motion.div>
          </div>
          <motion.div
            style={{ opacity: glow }}
            className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-lime/40 blur-3xl"
          />
        </motion.div>

        <motion.p style={{ opacity: glow }} className="relative mt-16 max-w-2xl px-5 text-center text-muted">
          The opportunity works when the parties agree on permissions, technical responsibilities, measurement and
          economics. ADVIO brings those decisions into one coordinated operating model.
        </motion.p>
      </div>
    </section>
  );
}

function Block({ label, title, body, gradient }: { label: string; title: string; body: string; gradient: string }) {
  return (
    <div className={`flex h-full min-h-[240px] flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br ${gradient} p-5 md:min-h-[340px] md:p-8`}>
      <p className="eyebrow text-[10px] text-cyan md:text-xs">{label}</p>
      <div>
        <p className="display text-lg text-white md:text-3xl">{title}</p>
        <p className="mt-4 hidden text-sm leading-relaxed text-white/70 md:block">{body}</p>
      </div>
    </div>
  );
}

function Caption({
  p,
  range,
  eyebrow,
  children,
  lime,
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  eyebrow: string;
  children: React.ReactNode;
  lime?: boolean;
}) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [40, 0, 0, -40]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      <p className="eyebrow mb-4 text-cyan">{eyebrow}</p>
      <h2 className={`display text-4xl md:text-7xl ${lime ? "text-lime" : "text-white"}`}>{children}</h2>
    </motion.div>
  );
}
