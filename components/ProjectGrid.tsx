import type { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

// `projects` arrive newest-first. Rank is chronological (oldest = 1) so a
// project keeps its identifier as new ones are added.
export default function ProjectGrid({
  projects,
  total,
  limit,
}: {
  projects: Project[];
  total?: number;
  limit?: number;
}) {
  const count = total ?? projects.length;
  const shown = limit ? projects.slice(0, limit) : projects;

  if (shown.length === 0) {
    return (
      <p className="panel px-6 py-10 text-[0.9375rem] text-muted">
        No projects have been published yet.
      </p>
    );
  }

  // Avoid a lone half-width card at the end of the two-column grid.
  const lastIsAlone = shown.length > 1 && shown.length % 2 === 1;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {shown.map((p, i) => (
        <ProjectCard
          key={p.id}
          project={p}
          rank={count - projects.indexOf(p)}
          wide={lastIsAlone && i === shown.length - 1}
        />
      ))}
    </div>
  );
}
