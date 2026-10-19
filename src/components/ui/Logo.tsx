import Image from "next/image";
import Link from "next/link";

/** Official Advio logos, never retyped: Reversed Dark on dark surfaces, Primary Light in the light theme. 32px tall (28px on mobile) per the brand guidelines. */
export default function Logo({ className = "" }: { className?: string }) {
  const img = "h-7 w-auto md:h-8";
  return (
    <Link href="/" aria-label="ADVIO home" className={`flex items-center ${className}`}>
      <Image src="/brand/advio-logo-reversed-dark.svg" alt="Advio" width={108} height={32} priority className={`${img} [[data-theme=light]_&]:hidden`} />
      <Image src="/brand/advio-logo-primary-light.svg" alt="Advio" width={108} height={32} priority className={`${img} hidden [[data-theme=light]_&]:block`} />
    </Link>
  );
}
