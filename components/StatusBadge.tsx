import { STATUS_META, type StatusTone } from "@/lib/format";
import type { ProjectStatus } from "@/lib/types";

const DOT: Record<StatusTone, string> = {
  blue: "bg-cherenkov",
  gold: "bg-plasma",
  hollow: "border border-muted bg-transparent",
  dim: "bg-dim",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, tone } = STATUS_META[status];
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.8125rem] text-muted">
      <span
        aria-hidden="true"
        className={`relative inline-block h-2 w-2 rounded-full ${DOT[tone]} ${
          tone === "gold" ? "pulse-ring" : ""
        }`}
      />
      {label}
    </span>
  );
}
