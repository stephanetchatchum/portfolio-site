import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ExplorationSection from "@/components/ExplorationSection";
import SkillGroup from "@/components/SkillGroup";
import Timeline from "@/components/Timeline";
import Avatar from "@/components/Avatar";
import Contact from "@/components/Contact";
import ButtonLink from "@/components/ButtonLink";
import {
  SKILL_GROUPS,
  TIMELINE,
  VISION,
  OUTSIDE_THE_TERMINAL,
} from "@/lib/site";

const HOME_PROJECT_LIMIT = 4;

export default async function HomePage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (projects ?? []) as Project[];
  const building = list.filter((p) => p.status === "in-progress");
  const currentlyBuilding = building[0];

  // The computation group is derived from what the projects actually use.
  const stack = Array.from(new Set(list.flatMap((p) => p.tech_stack))).sort(
    (a, b) => a.localeCompare(b),
  );

  return (
    <>
      <Hero
        currentTitle={currentlyBuilding?.title}
        currentHref={
          currentlyBuilding ? `/projects/${currentlyBuilding.slug}` : null
        }
        total={list.length}
        building={building.length}
      />

      <section
        id="projects"
        aria-labelledby="projects-title"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
      >
        <SectionHeader
          id="projects-title"
          title="Projects"
          meta={list.length > 0 ? `${list.length} logged` : undefined}
        >
          Simulations and models, each with its stack, status and source.
        </SectionHeader>
        <ProjectGrid projects={list} limit={HOME_PROJECT_LIMIT} />
        {list.length > HOME_PROJECT_LIMIT && (
          <div className="mt-8">
            <ButtonLink href="/projects">
              All {list.length} projects
            </ButtonLink>
          </div>
        )}
      </section>

      <ExplorationSection />

      <section
        id="toolkit"
        aria-labelledby="toolkit-title"
        className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28"
      >
        <SectionHeader id="toolkit-title" title="Toolkit">
          Grouped by the kind of work they support.
          {stack.length > 0 &&
            " Computation is taken from the stacks of the projects above."}
        </SectionHeader>
        <div className="panel divide-y divide-line">
          {stack.length > 0 && <SkillGroup title="Computation" items={stack} />}
          {SKILL_GROUPS.map((g) => (
            <SkillGroup key={g.title} title={g.title} items={g.items} />
          ))}
        </div>
      </section>

      <section
        id="background"
        aria-labelledby="background-title"
        className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28"
      >
        <SectionHeader id="background-title" title="Background" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Avatar />
            <blockquote className="mt-8 border-l-2 border-cherenkov/60 pl-5 text-[1.1875rem] leading-relaxed tracking-[-0.01em] text-ink">
              {VISION}
            </blockquote>
          </div>
          <div className="lg:col-span-7">
            <Timeline entries={TIMELINE} />

            <div className="mt-14 grid gap-5 border-t border-line pt-10 sm:grid-cols-[104px_1fr] sm:items-start sm:gap-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/stephane-02.jpg"
                alt="Stephane, away from the terminal"
                className="brackets panel aspect-[3/4] w-full object-cover grayscale-[15%] sm:w-[104px]"
              />
              <div>
                <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
                  Outside the terminal
                </h3>
                <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                  {OUTSIDE_THE_TERMINAL}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
