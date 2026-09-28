import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[0.9375rem] font-medium transition duration-200 motion-safe:hover:-translate-y-px";

const VARIANTS: Record<Variant, string> = {
  // Dark blue base, Cherenkov edge, soft glow.
  primary:
    "border border-cherenkov/55 bg-cherenkov/[0.12] text-ink shadow-[0_0_24px_-6px_rgb(0_210_255/0.35)] hover:border-cherenkov hover:bg-cherenkov/[0.2] hover:shadow-[0_0_32px_-4px_rgb(0_210_255/0.5)]",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-cherenkov/70 hover:text-cherenkov",
};

export default function ButtonLink({
  href,
  variant = "secondary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
