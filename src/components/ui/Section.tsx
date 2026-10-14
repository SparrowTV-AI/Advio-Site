import Image from "next/image";
import Reveal from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow mb-5 ${light ? "text-electric" : "text-cyan"}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`display text-5xl md:text-7xl ${light ? "text-ink" : "text-white"}`}>{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <div className={`mt-7 max-w-2xl text-lg leading-relaxed ${light ? "text-ink/70" : "text-muted"}`}>
            {body}
          </div>
        </Reveal>
      )}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 md:px-10 ${className}`}>{children}</div>;
}

export function FeatureGrid({
  items,
  tone = "dark",
}: {
  items: { title: string; body: string; icon?: string }[];
  tone?: "dark" | "light";
}) {
  const cols = items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  const light = tone === "light";
  return (
    <div className={`mt-16 grid gap-px overflow-hidden rounded-3xl ${cols}`} style={{ background: light ? "rgba(5,11,22,0.08)" : "var(--color-line)" }}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.08} className={light ? "bg-paper" : "bg-navy"}>
          <div className="h-full p-8 md:p-10">
            <div className="flex items-center justify-between">
              <span className={`display text-sm ${light ? "text-electric" : "text-lime"}`}>0{i + 1}</span>
              {it.icon && <Image src={it.icon} alt="" width={48} height={48} className={`h-12 w-12 object-contain ${light ? "" : "invert"}`} />}
            </div>
            <h3 className={`mt-6 text-2xl font-semibold tracking-tight ${light ? "text-ink" : "text-white"}`}>{it.title}</h3>
            <p className={`mt-4 leading-relaxed ${light ? "text-ink/70" : "text-muted"}`}>{it.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
