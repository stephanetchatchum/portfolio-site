import type { ProjectStatus } from "@/lib/types";

export type StatusTone = "blue" | "gold" | "hollow" | "dim";

// Gold is reserved for energy: work that is actively in progress.
// Cherenkov blue marks finished, "settled" work.
export const STATUS_META: Record<
  ProjectStatus,
  { label: string; tone: StatusTone }
> = {
  shipped: { label: "Shipped", tone: "blue" },
  "in-progress": { label: "In development", tone: "gold" },
  idea: { label: "Idea", tone: "hollow" },
  paused: { label: "Paused", tone: "dim" },
};

export function formatMonth(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDay(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Identifier from chronological rank (oldest project = P-001).
export function projectCode(rank: number): string {
  return `P-${String(rank).padStart(3, "0")}`;
}
