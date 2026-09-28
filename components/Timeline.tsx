import type { TimelineEntry } from "@/lib/site";

const NODE = {
  gold: "border-plasma bg-plasma",
  blue: "border-cherenkov bg-cherenkov",
  none: "border-line-strong bg-vacuum",
};

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol>
      {entries.map((e, i) => {
        const last = i === entries.length - 1;
        return (
          <li
            key={e.title}
            className="relative grid grid-cols-[1.25rem_1fr] gap-x-4 pb-10 last:pb-0 md:grid-cols-[8.5rem_1.25rem_1fr] md:gap-x-6"
          >
            <span className="col-start-2 row-start-1 font-mono text-[0.8125rem] leading-6 text-muted md:col-start-1 md:text-right">
              {e.when}
            </span>

            <span
              aria-hidden="true"
              className="relative col-start-1 row-span-2 row-start-1 md:col-start-2 md:row-span-1"
            >
              {!last && (
                <span className="absolute -bottom-10 left-1/2 top-3 w-px -translate-x-1/2 bg-line-strong" />
              )}
              <span
                className={`relative mx-auto mt-2 block h-2.5 w-2.5 rounded-full border ${NODE[e.tone ?? "none"]}`}
              />
            </span>

            <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
              <h3 className="text-[1.0625rem] font-semibold leading-6 tracking-[-0.01em] text-ink">
                {e.title}
              </h3>
              <p className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                {e.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
