"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Project, ProjectStatus } from "@/lib/types";

const STATUS_OPTIONS: ProjectStatus[] = [
  "idea",
  "in-progress",
  "shipped",
  "paused",
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminProjectsPage() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state — kept simple for v1; build_notes stays a plain textarea
  // until the Tiptap editor is wired in.
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("idea");
  const [shortDescription, setShortDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [repoLink, setRepoLink] = useState("");

  async function loadProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProjects(data as Project[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const { error } = await supabase.from("projects").insert({
      title,
      slug: slugify(title),
      status,
      short_description: shortDescription || null,
      tech_stack: techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      deploy_link: deployLink || null,
      repo_link: repoLink || null,
    });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setTitle("");
    setStatus("idea");
    setShortDescription("");
    setTechStack("");
    setDeployLink("");
    setRepoLink("");
    loadProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    loadProjects();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold">Manage projects</h1>

      <form
        onSubmit={handleCreate}
        className="mb-10 flex flex-col gap-4 rounded border border-gray-200 p-5"
      >
        <h2 className="text-sm font-semibold text-gray-500">Add a project</h2>

        <input
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Short description (for the listing card)"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
          rows={2}
        />

        <input
          placeholder="Tech stack (comma-separated, e.g. Next.js, Supabase, Tailwind)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        />

        <input
          placeholder="Deploy link (optional)"
          value={deployLink}
          onChange={(e) => setDeployLink(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        />

        <input
          placeholder="Repo link (optional)"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="self-start rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add project"}
        </button>
      </form>

      <h2 className="mb-3 text-sm font-semibold text-gray-500">
        Existing projects
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-gray-500">No projects yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded border border-gray-200 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-xs text-gray-500">
                  {p.status} · /{p.slug}
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
