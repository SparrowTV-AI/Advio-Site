import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "lime" | "ghost" | "dark";
  className?: string;
};

export default function Button({ href, children, variant = "lime", className = "" }: Props) {
  const styles = {
    lime: "bg-gem text-[#ffffff] hover:bg-gem-2 active:bg-[#1a42ba]",
    ghost: "border border-white/25 text-white hover:border-lime hover:text-lime",
    dark: "bg-ink text-white hover:bg-navy-3",
  }[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${styles} ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}
