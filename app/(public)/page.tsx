import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectStatus } from "@/lib/types";
import Avatar from "@/components/Avatar";
import OrbitMark from "@/components/OrbitMark";
import PlotMark from "@/components/PlotMark";

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

  const currentlyBuilding = list.find((p) => p.status === "in-progress");

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="flex flex-col gap-8 pb-14 pt-16 sm:flex-row sm:items-start">
        <Avatar />

        <div>
          <div className="mb-4 flex items-center gap-3 text-muted">
            <OrbitMark className="h-6 w-6" />
            <PlotMark className="h-6 w-6" />
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

          <div className="mt-5 flex flex-col gap-1 font-[family-name:var(--font-mono)] text-[0.8rem] text-muted">
            {currentlyBuilding && (
              <span>
                Currently building:{" "}
                <span className="text-ink">{currentlyBuilding.title}</span>
              </span>
            )}
            <span>Choir practice: Tue &amp; Thu</span>
            <span>Training: karate</span>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline pt-8">
        <p className="mb-8 font-[family-name:var(--font-mono)] text-[0.82rem] text-muted">
          <strong className="font-medium text-ink">{counts.shipped}</strong>{" "}
          shipped
          <span className="mx-2.5 text-hairline">·</span>
          <strong className="font-medium text-ink">{counts.building}</strong>{" "}
          building
          <span className="mx-2.5 text-hairline">·</span>
          <strong className="font-medium text-ink">{counts.idea}</strong>{" "}
          ideas
        </p>

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
