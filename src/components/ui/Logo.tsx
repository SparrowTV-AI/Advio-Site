import Link from "next/link";

/** ADVIO mark (recreated from the Monolith concept). Swap for the official SVG when available. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <defs>
        <mask id="advio-bite">
          <rect x="7" y="7" width="26" height="26" rx="6" fill="#fff" transform="rotate(45 20 20)" />
          <circle cx="29.5" cy="12" r="8.2" fill="#000" />
        </mask>
      </defs>
      <rect x="0" y="0" width="40" height="40" fill="#fff" mask="url(#advio-bite)" />
      <rect x="26.6" y="9.1" width="5.8" height="5.8" rx="1.2" fill="#4f7bff" transform="rotate(45 29.5 12)" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="ADVIO home" className={`flex items-center gap-2 ${className}`}>
      <Mark />
      <span className="text-[1.45rem] font-semibold lowercase tracking-tight text-white">advio</span>
    </Link>
  );
}
