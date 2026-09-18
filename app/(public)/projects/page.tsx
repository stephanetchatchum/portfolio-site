import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Project } from "@/lib/types";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm text-red-600">
          Couldn&apos;t load projects: {error.message}
        </p>
      </main>
    );
  }

  const list = (projects ?? []) as Project[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold">Projects</h1>

      {list.length === 0 ? (
        <p className="text-sm text-gray-500">
          No projects yet — add one from the admin panel.
        </p>
      ) : (
        <ul className="flex flex-col gap-6">
          {list.map((p) => (
            <li key={p.id} className="border-b border-gray-200 pb-6">
              <Link href={`/projects/${p.slug}`} className="hover:underline">
                <h2 className="text-lg font-medium">{p.title}</h2>
              </Link>
              <p className="mb-2 text-xs text-gray-500">{p.status}</p>
              {p.short_description && (
                <p className="mb-2 text-sm text-gray-700">
                  {p.short_description}
                </p>
              )}
              {p.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
