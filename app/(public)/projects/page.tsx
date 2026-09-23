import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
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

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted">
          Couldn&apos;t load projects: {error.message}
        </p>
      </div>
    );
  }

  const list = (projects ?? []) as Project[];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-medium text-ink">
        Work
      </h1>

      {list.length === 0 ? (
        <p className="text-sm text-muted">No projects yet.</p>
      ) : (
        <div className="border-t border-hairline">
          {list.map((p) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
