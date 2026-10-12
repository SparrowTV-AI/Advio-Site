import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    t: "Define",
    s: "the scope.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="16" r="8" />
        <circle cx="20" cy="16" r="8" />
      </svg>
    ),
  },
  {
    n: "02",
    t: "Agree",
    s: "the baseline.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M16 4 28 10 16 16 4 10Z" />
        <path d="M4 16l12 6 12-6M4 22l12 6 12-6" />
      </svg>
    ),
  },
  {
    n: "03",
    t: "Evaluate",
    s: "the results.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="5" y="17" width="5" height="10" rx="1" />
        <rect x="13.5" y="11" width="5" height="16" rx="1" />
        <rect x="22" y="5" width="5" height="22" rx="1" />
      </svg>
    ),
  },
];

export default function Evidence() {
  return (
    <section className="relative bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-white/10 px-5 py-20 md:grid-cols-[1.2fr_2fr] md:px-10 md:py-24">
        <Reveal>
          <h2 className="display text-5xl text-white md:text-6xl">
            Built around
            <br />
            <span className="text-gradient">evidence.</span>
          </h2>
          <p className="mt-5 text-muted">Define the scope. Agree the baseline. Evaluate the results.</p>
        </Reveal>
        <div className="grid grid-cols-3 md:divide-x md:divide-white/10">
          {steps.map((st, i) => (
            <Reveal key={st.n} delay={i * 0.1} className="md:px-10">
              <p className="text-xs text-white/40">{st.n}</p>
              <div className="mt-4 text-silver">{st.icon}</div>
              <p className="mt-5 text-lg font-medium text-white md:text-xl">{st.t}</p>
              <p className="text-muted">{st.s}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
