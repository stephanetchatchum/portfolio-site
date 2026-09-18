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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
        {p.status}
      </p>
      <h1 className="mb-4 text-2xl font-semibold">{p.title}</h1>

      {p.short_description && (
        <p className="mb-6 text-gray-700">{p.short_description}</p>
      )}

      {p.tech_stack.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {p.tech_stack.map((t) => (
            <span
              key={t}
              className="rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-600"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mb-6 flex gap-4 text-sm">
        {p.deploy_link && (
          <a
            href={p.deploy_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Live demo
          </a>
        )}
        {p.repo_link && (
          <a
            href={p.repo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Source
          </a>
        )}
        {p.vlog_link && (
          <a
            href={p.vlog_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Vlog
          </a>
        )}
      </div>

      {/* build_notes is stored as Tiptap JSON once the rich text editor
          is wired in. For now it's unused until that piece is built. */}
    </main>
  );
}
