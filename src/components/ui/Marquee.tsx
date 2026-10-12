export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-electric py-5">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="eyebrow flex items-center gap-12 text-sm text-white">
            {t}
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
