"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost, BlogPostType, Project } from "@/lib/types";

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [postType, setPostType] = useState<BlogPostType>("general");
  const [projectId, setProjectId] = useState<string>("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    async function load() {
      const [{ data: post, error: postError }, { data: projectData }] =
        await Promise.all([
          supabase.from("blog_posts").select("*").eq("id", id).single(),
          supabase.from("projects").select("*").order("title"),
        ]);

      setProjects((projectData ?? []) as Project[]);

      if (postError || !post) {
        setError(postError?.message ?? "Post not found");
        setLoading(false);
        return;
      }

      const p = post as BlogPost;
      setTitle(p.title);
      setSlug(p.slug);
      setPostType(p.post_type);
      setProjectId(p.project_id ?? "");
      setContent(typeof p.content === "string" ? p.content : "");
      setPublished(!!p.published_at);
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const { error } = await supabase
      .from("blog_posts")
      .update({
        title,
        slug,
        post_type: postType,
        project_id: postType === "project-update" ? projectId || null : null,
        content,
        published_at: published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold">Edit post</h1>

      <form
        onSubmit={handleSave}
        className="flex flex-col gap-4 rounded border border-gray-200 p-5"
      >
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Slug
          </label>
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Type
          </label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value as BlogPostType)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="general">General</option>
            <option value="project-update">Project update</option>
          </select>
        </div>

        {postType === "project-update" && (
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Linked project
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">None</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Content
          </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Published
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
