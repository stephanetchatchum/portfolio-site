import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectStatus } from "@/lib/types";
import Avatar from "@/components/Avatar";
import OrbitMark from "@/components/OrbitMark";
import PlotMark from "@/components/PlotMark";
import FloatingEquations from "@/components/FloatingEquations";

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

const QUESTIONS = [
  { tag: "01", q: "How do multi-body gravitational systems behave when closed-form solutions don't exist?" },
  { tag: "02", q: "How reliably can a model separate a real signal from noise — a planetary transit from a false positive?" },
  { tag: "03", q: "Can the same numerical tools used for orbital mechanics describe dynamics inside biological systems?" },
  { tag: "04", q: "What computational infrastructure does a self-taught scientist actually need to get from curiosity to a working model?" },
];

const DOMAINS = [
  { tag: "01", title: "Mathematics", items: "Linear algebra · differential equations · numerical methods" },
  { tag: "02", title: "Physics & simulation", items: "Orbital mechanics · N-body dynamics · gravitational systems" },
  { tag: "03", title: "Machine learning", items: "Classification · model evaluation · applied ML pipelines" },
  { tag: "04", title: "Building worlds", items: "Game systems design · worldbuilding · team collaboration" },
];

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

  const currentlyBuilding = list.find((p) => p.status === "in-progress");

  const arsenal = Array.from(new Set(list.flatMap((p) => p.tech_stack))).sort();

  const TIMELINE = [
    { year: "Upper Sixth", title: "National mathematics olympiad selection", body: "Placed 8th of 1,279 nationally; 2nd of 89 in Upper Sixth." },
    { year: "A-Levels", title: "4 A's, 1 B in sciences", body: "Entered ALU as a first-year with strong science credentials." },
    { year: "Ongoing", title: "BSc Software Engineering, ALU", body: "African Leadership University, Kigali, Rwanda." },
    { year: "Two summers", title: "Teaching, For-All Tech Bootcamp", body: "Taught game programming and programming logic to children." },
    { year: "Apr–Jul 2026", title: "Internship, Irembo", body: "Software engineering internship." },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="relative grid grid-cols-1 gap-10 overflow-hidden pb-12 pt-16 lg:grid-cols-12">
        <FloatingEquations />

        <div className="relative z-10 lg:col-span-7">
          <div className="mb-6 flex items-center gap-4">
            <Avatar />
            <div className="flex items-center gap-3 text-muted">
              <OrbitMark className="h-6 w-6" />
              <PlotMark className="h-6 w-6" />
            </div>
          </div>

          <p className="max-w-[58ch] text-[1.02rem] leading-[1.65] text-ink">
            I&apos;m Stephane — a computational science and software
            engineering student in Kigali, originally from Cameroon. Most
            days I&apos;m somewhere between debugging a gravitational
            simulator and untangling a machine learning pipeline, but the
            same discipline shows up outside the terminal too: I train in
            karate (black belt), and I serve as choir maestro and lead
            singer in my parish choir — a role I&apos;ve held since
            childhood. I&apos;m also active in organizing the Cameroonian
            community here in Rwanda.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {currentlyBuilding && (
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.75rem] text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-building opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-building" />
                </span>
                Currently building{" "}
                <span className="text-ink">{currentlyBuilding.title}</span>
              </span>
            )}
            <span className="font-[family-name:var(--font-mono)] text-[0.75rem] text-muted">
              Choir: Tue &amp; Thu · Training: karate
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center border-t border-hairline pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <span className="mb-3 font-[family-name:var(--font-mono)] text-[0.7rem] text-status-shipped">
            r(t)
          </span>
          <div className="flex flex-col gap-3 font-[family-name:var(--font-mono)] text-[0.85rem] text-muted">
            <div className="flex justify-between border-b border-hairline pb-2">
              <span>r₀</span>
              <span className="text-ink">Yaoundé, Cameroon</span>
            </div>
            <div className="flex justify-between border-b border-hairline pb-2">
              <span>r₁</span>
              <span className="text-ink">Kigali, Rwanda</span>
            </div>
            <div className="flex justify-between">
              <span>lim</span>
              <span className="text-ink">Computational science</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline py-12">
        <span className="mb-3 block font-[family-name:var(--font-mono)] text-[0.7rem] text-status-shipped">
          Vision
        </span>
        <p className="max-w-[62ch] font-[family-name:var(--font-display)] text-[1.15rem] italic leading-[1.55] text-ink">
          Building toward computational science capacity in Africa — working
          from the belief that African technological independence runs
          through scientific computing, not around it.
        </p>
      </section>

      <section className="border-b border-hairline py-12">
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg text-ink">
          What I&apos;m trying to understand
        </h2>
        <p className="mb-8 max-w-[55ch] text-[0.9rem] text-muted">
          Not a list of technologies — the actual questions the projects
          below are circling.
        </p>
        <div className="flex flex-col">
          {QUESTIONS.map((item) => (
            <div key={item.tag} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-hairline py-5 first:border-t-0">
              <span className="font-[family-name:var(--font-mono)] text-[0.75rem] text-status-building">{item.tag}</span>
              <p className="max-w-[56ch] text-[0.95rem] leading-relaxed text-ink">{item.q}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-hairline py-12">
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-lg text-ink">Domains</h2>
        <div className="flex flex-col">
          {DOMAINS.map((d) => (
            <div key={d.title} className="grid grid-cols-1 gap-1 border-t border-hairline py-4 first:border-t-0 sm:grid-cols-[2.5rem_12rem_1fr] sm:items-baseline sm:gap-4">
              <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-status-building">{d.tag}</span>
              <h3 className="font-[family-name:var(--font-display)] text-[0.95rem] text-ink">{d.title}</h3>
              <span className="font-[family-name:var(--font-mono)] text-[0.78rem] text-muted">{d.items}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-8">
        <p className="mb-8 font-[family-name:var(--font-mono)] text-[0.82rem] text-muted">
          <strong className="font-medium text-ink">{counts.shipped}</strong> shipped
          <span className="mx-2.5 text-hairline">·</span>
          <strong className="font-medium text-ink">{counts.building}</strong> building
          <span className="mx-2.5 text-hairline">·</span>
          <strong className="font-medium text-ink">{counts.idea}</strong> ideas
        </p>

        {list.length === 0 ? (
          <p className="py-10 text-sm text-muted">No projects yet — add one from the admin panel.</p>
        ) : (
          list.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="grid grid-cols-[16px_1fr_auto] items-start gap-5 border-b border-hairline py-6 no-underline">
              <span className={`mt-2 h-2 w-2 rounded-full ${STATUS_DOT[p.status]}`} />
              <div>
                <div className="mb-1.5 flex flex-wrap items-baseline gap-3">
                  <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-medium text-ink">{p.title}</h2>
                  <span className="font-[family-name:var(--font-mono)] text-[0.72rem] text-muted">{STATUS_LABEL[p.status]}</span>
                </div>
                {p.short_description && <p className="mb-3 max-w-[56ch] text-[0.92rem] text-muted">{p.short_description}</p>}
                {p.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.tech_stack.map((t) => (
                      <span key={t} className="rounded border border-hairline px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.72rem] text-muted">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="pt-0.5 font-[family-name:var(--font-mono)] text-[0.78rem] text-muted">
                {new Date(p.created_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
              </span>
            </Link>
          ))
        )}
      </section>

      <section className="border-t border-hairline py-12">
        <span className="mb-6 block font-[family-name:var(--font-mono)] text-[0.7rem] text-status-shipped">Arsenal</span>
        {arsenal.length === 0 ? (
          <p className="text-sm text-muted">Populated automatically from tech stacks listed on projects.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {arsenal.map((t) => (
              <span key={t} className="rounded border border-hairline px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.78rem] text-muted">{t}</span>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-hairline py-12">
        <span className="mb-6 block font-[family-name:var(--font-mono)] text-[0.7rem] text-status-shipped">Timeline</span>
        <div className="flex flex-col">
          {TIMELINE.map((t) => (
            <div key={t.title} className="grid grid-cols-1 gap-1 border-t border-hairline py-4 first:border-t-0 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <span className="font-[family-name:var(--font-mono)] text-[0.75rem] text-muted">{t.year}</span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-[0.95rem] text-ink">{t.title}</h3>
                <p className="text-[0.85rem] text-muted">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline py-12">
        <span className="mb-6 block font-[family-name:var(--font-mono)] text-[0.7rem] text-status-shipped">Contact</span>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="mailto:stephanetchatchum@gmail.com" className="flex-1 rounded border border-hairline p-4 text-sm text-ink transition-colors hover:border-status-shipped">
            <span className="block font-[family-name:var(--font-mono)] text-[0.68rem] text-muted">Email</span>
            stephanetchatchum@gmail.com
          </a>
          <a href="https://github.com/stephanetchatchum" target="_blank" rel="noopener noreferrer" className="flex-1 rounded border border-hairline p-4 text-sm text-ink transition-colors hover:border-status-shipped">
            <span className="block font-[family-name:var(--font-mono)] text-[0.68rem] text-muted">GitHub</span>
            github.com/stephanetchatchum
          </a>
          <a href="https://www.linkedin.com/in/stephane-tchatchum-7b4666383/" target="_blank" rel="noopener noreferrer" className="flex-1 rounded border border-hairline p-4 text-sm text-ink transition-colors hover:border-status-shipped">
            <span className="block font-[family-name:var(--font-mono)] text-[0.68rem] text-muted">LinkedIn</span>
            in/stephane-tchatchum
          </a>
        </div>
      </section>
    </div>
  );
}