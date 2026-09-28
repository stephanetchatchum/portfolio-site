import type { ReactNode } from "react";

// Title on the left, a measured quantity on the right, and a ruler
// underneath. The meta string should be real data (a count, a date).
export default function SectionHeader({
  id,
  title,
  meta,
  children,
}: {
  id: string;
  title: string;
  meta?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 sm:mb-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2
          id={id}
          className="text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink"
        >
          {title}
        </h2>
        {meta && (
          <span className="font-mono text-[0.8125rem] text-muted">{meta}</span>
        )}
      </div>
      <div className="ruler mt-5" aria-hidden="true" />
      {children && (
        <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">
          {children}
        </p>
      )}
    </header>
  );
}
