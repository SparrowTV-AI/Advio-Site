export default function Faq({ items, tone = "light" }: { items: { q: string; a: string }[]; tone?: "light" | "dark" }) {
  const light = tone === "light";
  return (
    <div className={`mt-14 divide-y ${light ? "divide-ink/10 border-y border-ink/10" : "divide-white/10 border-y border-white/10"}`}>
      {items.map((it) => (
        <details key={it.q} className="group py-7">
          <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold md:text-2xl ${light ? "text-ink" : "text-white"}`}>
            {it.q}
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/20 text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className={`mt-5 max-w-3xl text-lg leading-relaxed ${light ? "text-ink/70" : "text-muted"}`}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
