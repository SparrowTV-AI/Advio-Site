import Link from "next/link";

/** Placeholder recreation of the ADVIO mark. Swap in /public/brand/advio-logo.svg when available. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="ADVIO home" className={`flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
        <rect x="5" y="5" width="22" height="22" rx="5" transform="rotate(45 16 16)" fill="#68B77D" />
        <path d="M16 10.5 L21.5 16 L16 21.5 Z" fill="#050b16" opacity="0.9" />
        <rect x="13.4" y="13.4" width="5.2" height="5.2" rx="1.2" transform="rotate(45 16 16)" fill="#fff" />
      </svg>
      <span className="display text-[1.6rem] font-bold lowercase tracking-tight text-white">
        advio<span className="text-lime">.</span>
      </span>
    </Link>
  );
}
