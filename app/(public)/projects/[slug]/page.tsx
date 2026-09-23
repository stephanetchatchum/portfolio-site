import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Project } from "@/lib/types";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) {
    notFound();
  }

  const p = project as Project;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.78rem] text-muted">
        {p.status}
      </p>
      <h1 className="mb-5 font-[family-name:var(--font-display)] text-3xl font-medium text-ink">
        {p.title}
      </h1>

      {p.short_description && (
        <p className="mb-6 max-w-[60ch] text-[1.02rem] text-muted">
          {p.short_description}
        </p>
      )}

      {p.tech_stack.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
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

      <div className="mb-10 flex gap-5 border-t border-hairline pt-6 text-sm">
        {p.deploy_link && (
          <a
            href={p.deploy_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-status-shipped hover:underline"
          >
            Live demo
          </a>
        )}
        {p.repo_link && (
          <a
            href={p.repo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-status-shipped hover:underline"
          >
            Source
          </a>
        )}
        {p.vlog_link && (
          <a
            href={p.vlog_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-status-shipped hover:underline"
          >
            Vlog
          </a>
        )}
      </div>

      {/* build_notes renders here once the rich text editor is wired in */}
    </div>
  );
}
