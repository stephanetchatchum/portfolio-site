import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectStatus } from "@/lib/types";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: "shipped",
  "in-progress": "building",
  idea: "idea",
  paused: "paused",
};

const STATUS_DOT: Record<ProjectStatus, string> = {
  shipped: "bg-status-shipped",
  "in-progress": "bg-status-building",
  idea: "border border-status-idea bg-transparent",
  paused: "bg-status-paused",
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (projects ?? []) as Project[];

  const counts = {
    shipped: list.filter((p) => p.status === "shipped").length,
    building: list.filter((p) => p.status === "in-progress").length,
    idea: list.filter((p) => p.status === "idea").length,
  };

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pb-10 pt-16">
        <h1 className="mb-7 max-w-[34ch] font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,2.15rem)] italic leading-[1.32] tracking-tight text-ink">
          Building toward computational science — simulations, machine
          learning, and a couple of worlds besides.
        </h1>
        <p className="font-[family-name:var(--font-mono)] text-[0.82rem] text-muted">
          <strong className="font-medium text-ink">{counts.shipped}</strong>{" "}
          shipped
          <span className="mx-2.5 text-hairline">·</span>
          <strong className="font-medium text-ink">{counts.building}</strong>{" "}
          building
          <span className="mx-2.5 text-hairline">·</span>
          <strong className="font-medium text-ink">{counts.idea}</strong>{" "}
          ideas
        </p>
      </section>

      <section className="border-t border-hairline">
        {list.length === 0 ? (
          <p className="py-10 text-sm text-muted">
            No projects yet — add one from the admin panel.
          </p>
        ) : (
          list.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="grid grid-cols-[16px_1fr_auto] items-start gap-5 border-b border-hairline py-6 no-underline"
            >
              <span
                className={`mt-2 h-2 w-2 rounded-full ${STATUS_DOT[p.status]}`}
              />
              <div>
                <div className="mb-1.5 flex flex-wrap items-baseline gap-3">
                  <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-medium text-ink">
                    {p.title}
                  </h2>
                  <span className="font-[family-name:var(--font-mono)] text-[0.72rem] text-muted">
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                {p.short_description && (
                  <p className="mb-3 max-w-[56ch] text-[0.92rem] text-muted">
                    {p.short_description}
                  </p>
                )}
                {p.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.tech_stack.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-hairline px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.72rem] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="pt-0.5 font-[family-name:var(--font-mono)] text-[0.78rem] text-muted">
                {new Date(p.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
