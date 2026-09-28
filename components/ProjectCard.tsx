import Link from "next/link";
import type { Project } from "@/lib/types";
import { formatMonth, projectCode } from "@/lib/format";
import StatusBadge from "./StatusBadge";

/*
  One experiment record. Only fields that exist on the project are shown:
  there is no invented method, field of study or result. The whole card is
  one link (via the title), with the repository / demo / video links raised
  above it so they stay independently clickable.
*/
export default function ProjectCard({
  project,
  rank,
  wide = false,
}: {
  project: Project;
  rank: number;
  wide?: boolean;
}) {
  const started = formatMonth(project.start_date ?? project.created_at);
  const result = project.key_achievements?.[0];
  const links = [
    project.repo_link && { href: project.repo_link, label: "Repository" },
    project.deploy_link && { href: project.deploy_link, label: "Live demo" },
    project.vlog_link && { href: project.vlog_link, label: "Video" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <article
      className={`panel brackets group flex flex-col p-6 sm:p-7 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[0.8125rem] text-cherenkov">
          {projectCode(rank)}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <div
        className={`mt-6 flex flex-1 flex-col gap-8 ${
          wide ? "md:grid md:grid-cols-[1.15fr_1fr] md:gap-12" : ""
        }`}
      >
        <div>
          <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-cherenkov focus-visible:outline-offset-8"
            >
              {project.title}
            </Link>
          </h3>
          {project.short_description && (
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {project.short_description}
            </p>
          )}
        </div>

        <dl
          className={`grid grid-cols-[5.25rem_1fr] gap-x-4 gap-y-4 border-t border-line pt-5 text-[0.9375rem] md:content-start ${
            wide ? "" : "mt-auto"
          }`}
        >
          {result && (
            <>
              <dt className="pt-0.5 font-mono text-[0.8125rem] text-muted">Result</dt>
              <dd className="leading-snug text-ink">{result}</dd>
            </>
          )}
          {project.tech_stack.length > 0 && (
            <>
              <dt className="pt-1 font-mono text-[0.8125rem] text-muted">Stack</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech_stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-[3px] border border-line bg-vacuum/50 px-2 py-0.5 font-mono text-[0.8125rem] text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </>
          )}
          {started && (
            <>
              <dt className="font-mono text-[0.8125rem] text-muted">Started</dt>
              <dd className="font-mono text-[0.8125rem] text-ink">{started}</dd>
            </>
          )}
        </dl>
      </div>

      {links.length > 0 && (
        <div className="relative z-10 mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-[0.9375rem]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-cherenkov hover:decoration-cherenkov"
            >
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
