"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

/** Apple-style pinned scene: the two businesses slide together and ADVIO locks in between. */
export default function ConnectionScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const leftX = useTransform(p, [0, 0.45], ["-70%", "0%"]);
  const rightX = useTransform(p, [0, 0.45], ["70%", "0%"]);
  const midY = useTransform(p, [0.35, 0.6], ["-45%", "0%"]);
  const midO = useTransform(p, [0.4, 0.55], [0, 1]);
  const tilt = useTransform(p, [0, 1], [28, 8]);
  const glow = useTransform(p, [0.55, 0.7], [0, 1]);
  const scale = useTransform(p, [0.7, 1], [1, 0.92]);

  return (
    <section id="connection" ref={ref} className="relative h-[380vh] bg-ink">
      <div className="bg-modern sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden pt-20">

        <div className="relative z-10 mb-10 h-40 w-full max-w-4xl px-5 text-center md:mb-16">
          <Caption p={p} range={[0, 0.08, 0.28, 0.36]} eyebrow="The connection that creates opportunity">
            Different businesses.
          </Caption>
          <Caption p={p} range={[0.36, 0.42, 0.62, 0.7]} eyebrow="ADVIO">
            The piece that changes the picture.
          </Caption>
          <Caption p={p} range={[0.7, 0.76, 0.98, 1]} eyebrow="Shared opportunity" gem>
            A shared path to incremental value.
          </Caption>
        </div>

        <motion.div style={{ rotateX: tilt, scale, transformPerspective: 1400 }} className="relative w-full max-w-5xl px-5">
          <div className="relative mx-auto aspect-[900/340] w-full">
            <motion.div style={{ x: leftX }} className="absolute left-0 top-0 z-10 h-full w-1/3">
              <Piece kind="left" id="pl" from="#13235e" to="#3651c9" stroke="rgba(150,175,255,0.35)" />
              <PieceText label="Broadcasters" title="Premium inventory. Commercial authority." body="Authorize eligible inventory and set advertiser rules." />
            </motion.div>
            <motion.div style={{ y: midY, opacity: midO }} className="absolute left-1/3 top-0 z-20 h-full w-1/3">
              <Piece kind="mid" id="pm" from="#f2f5ff" to="#9fb4ff" stroke="rgba(255,255,255,0.9)" glow />
              <PieceText dark mid label="ADVIO" title="The intelligence that connects." body="Eligibility · Activation · Measurement" />
            </motion.div>
            <motion.div style={{ x: rightX }} className="absolute left-2/3 top-0 z-10 h-full w-1/3">
              <Piece kind="right" id="pr" from="#4f6dff" to="#16255c" stroke="rgba(150,175,255,0.35)" />
              <PieceText right label="Distributors" title="Audience delivery. Network capability." body="Enable supported delivery and define participation." />
            </motion.div>
          </div>
          <motion.div
            style={{ opacity: glow }}
            className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-gem/50 blur-3xl"
          />
        </motion.div>

        <motion.p style={{ opacity: glow }} className="relative mt-16 max-w-2xl px-5 text-center text-muted">
          The opportunity works when the parties agree on permissions, technical responsibilities, measurement and
          economics. Advio brings those decisions into one coordinated operating model.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Puzzle pieces ---------- */
// Each piece is 300 x 340 user units; knobs sit on the vertical edges and interlock exactly.
const PW = 300, PH = 340, R = 46, CY = PH / 2, K = R * 0.62, CR = 22;

function piecePath(kind: "left" | "mid" | "right") {
  const top = `M ${CR} 0 H ${PW - CR} Q ${PW} 0 ${PW} ${CR}`;
  // right edge (going down)
  const rightEdge =
    kind === "left"
      ? `V ${CY - K} A ${R} ${R} 0 1 1 ${PW} ${CY + K} V ${PH - CR}` // tab out
      : kind === "mid"
        ? `V ${CY - K} A ${R} ${R} 0 1 0 ${PW} ${CY + K} V ${PH - CR}` // socket in
        : `V ${PH - CR}`;
  const bottom = `Q ${PW} ${PH} ${PW - CR} ${PH} H ${CR} Q 0 ${PH} 0 ${PH - CR}`;
  // left edge (going up)
  const leftEdge =
    kind === "left"
      ? `V ${CR}`
      : kind === "mid"
        ? `V ${CY + K} A ${R} ${R} 0 1 0 0 ${CY - K} V ${CR}` // socket in
        : `V ${CY + K} A ${R} ${R} 0 1 1 0 ${CY - K} V ${CR}`; // tab out
  return `${top} ${rightEdge} ${bottom} ${leftEdge} Q 0 0 ${CR} 0 Z`;
}

function Piece({ kind, id, from, to, stroke, glow }: { kind: "left" | "mid" | "right"; id: string; from: string; to: string; stroke: string; glow?: boolean }) {
  return (
    <svg viewBox={`0 0 ${PW} ${PH}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0.2" x2="1" y2="0.8">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        d={piecePath(kind)}
        fill={`url(#${id})`}
        stroke={stroke}
        strokeWidth={1.5}
        style={glow ? { filter: "drop-shadow(0 24px 50px rgba(79,123,255,0.55))" } : undefined}
      />
    </svg>
  );
}

function PieceText({ label, title, body, dark, right, mid }: { label: string; title: string; body: string; dark?: boolean; right?: boolean; mid?: boolean }) {
  return (
    <div className={`relative flex h-full flex-col justify-between p-3 sm:p-5 md:p-8 ${right ? "md:pl-12" : ""} ${mid ? "!px-[20%] text-center items-center" : ""} ${dark ? "text-ink" : "text-white"}`}>
      <p className={`eyebrow text-[8px] sm:text-[10px] md:text-xs ${dark ? "text-ink/70" : "text-steel"}`}>{label}</p>
      <div>
        <p className="display text-[11px] leading-tight sm:text-lg md:text-3xl">{title}</p>
        <p className={`mt-3 hidden text-sm leading-relaxed md:block ${dark ? "text-ink/70" : "text-white/70"}`}>{body}</p>
      </div>
    </div>
  );
}

function Caption({
  p,
  range,
  eyebrow,
  children,
  gem,
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  eyebrow: string;
  children: React.ReactNode;
  gem?: boolean;
}) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [40, 0, 0, -40]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      <p className="eyebrow mb-4 text-steel">{eyebrow}</p>
      <h2 className={`display text-4xl md:text-7xl ${gem ? "text-silver" : "text-white"}`}>{children}</h2>
    </motion.div>
  );
}
