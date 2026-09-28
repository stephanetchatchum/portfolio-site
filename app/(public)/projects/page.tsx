import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import SectionHeader from "@/components/SectionHeader";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata = { title: "Projects | Stephane Tchatchum Chassem" };

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-[calc(72px+4rem)] sm:px-8">
        <p className="panel px-6 py-8 text-[0.9375rem] text-muted">
          Couldn&apos;t load projects: {error.message}
        </p>
      </div>
    );
  }

  const list = (projects ?? []) as Project[];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-[calc(72px+4rem)] sm:px-8 lg:pb-32">
      <SectionHeader
        id="projects-title"
        title="Projects"
        meta={list.length > 0 ? `${list.length} logged` : undefined}
      >
        Simulations and models, each with its stack, status and source.
      </SectionHeader>
      <ProjectGrid projects={list} />
    </div>
  );
}
