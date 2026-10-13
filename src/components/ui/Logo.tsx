import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="ADVIO home" className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/brand/advio-mark.png" alt="" width={34} height={34} priority />
      <span className="display text-[1.6rem] font-bold lowercase tracking-tight text-white">
        advio<span className="text-lime">.</span>
      </span>
    </Link>
  );
}
