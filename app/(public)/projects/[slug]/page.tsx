import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { formatMonth } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import ButtonLink from "@/components/ButtonLink";

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
  const started = formatMonth(p.start_date ?? p.created_at);
  const ended = formatMonth(p.end_date);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-[calc(72px+3rem)] sm:px-8 lg:pb-32">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-[0.8125rem] text-muted transition-colors hover:text-cherenkov"
      >
        <span aria-hidden="true">&larr;</span> All projects
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <StatusBadge status={p.status} />
        {started && (
          <span className="font-mono text-[0.8125rem] text-muted">
            {started}
            {ended ? ` to ${ended}` : ""}
          </span>
        )}
      </div>

      <h1 className="mt-5 max-w-[20ch] text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {p.title}
      </h1>

      {p.short_description && (
        <p className="mt-6 max-w-[62ch] text-[1.125rem] leading-relaxed text-muted">
          {p.short_description}
        </p>
      )}

      {(p.repo_link || p.deploy_link || p.vlog_link) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {p.deploy_link && (
            <ButtonLink href={p.deploy_link} variant="primary" external>
              Live demo
            </ButtonLink>
          )}
          {p.repo_link && (
            <ButtonLink href={p.repo_link} external>
              Repository
            </ButtonLink>
          )}
          {p.vlog_link && (
            <ButtonLink href={p.vlog_link} external>
              Video
            </ButtonLink>
          )}
        </div>
      )}

      <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-14">
        {p.tech_stack.length > 0 && (
          <section className="lg:col-span-4" aria-labelledby="stack-title">
            <h2 id="stack-title" className="font-mono text-[0.8125rem] text-muted">
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech_stack.map((t) => (
                <li
                  key={t}
                  className="rounded-[3px] border border-line bg-vacuum/50 px-2.5 py-1 font-mono text-[0.8125rem] text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        {p.key_achievements?.length > 0 && (
          <section className="lg:col-span-8" aria-labelledby="results-title">
            <h2 id="results-title" className="font-mono text-[0.8125rem] text-muted">
              Key results
            </h2>
            <ul className="mt-4">
              {p.key_achievements.map((a) => (
                <li
                  key={a}
                  className="border-t border-line py-4 text-[1rem] leading-relaxed text-ink last:border-b"
                >
                  {a}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* build_notes renders here once the rich text editor is wired in */}
    </div>
  );
}
