"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost, BlogPostType, Project } from "@/lib/types";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminBlogPage() {
  const supabase = createClient();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState<BlogPostType>("general");
  const [projectId, setProjectId] = useState<string>("");
  const [content, setContent] = useState("");
  const [publishNow, setPublishNow] = useState(true);

  async function loadAll() {
    setLoading(true);
    const [{ data: postData, error: postError }, { data: projectData }] =
      await Promise.all([
        supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("projects").select("*").order("title"),
      ]);

    if (postError) {
      setError(postError.message);
    } else {
      setPosts(postData as BlogPost[]);
    }
    setProjects((projectData ?? []) as Project[]);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const { error } = await supabase.from("blog_posts").insert({
      title,
      slug: slugify(title),
      post_type: postType,
      project_id: postType === "project-update" ? projectId || null : null,
      content,
      published_at: publishNow ? new Date().toISOString() : null,
    });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setTitle("");
    setPostType("general");
    setProjectId("");
    setContent("");
    setPublishNow(true);
    loadAll();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    loadAll();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold">Manage blog posts</h1>

      <form
        onSubmit={handleCreate}
        className="mb-10 flex flex-col gap-4 rounded border border-gray-200 p-5"
      >
        <h2 className="text-sm font-semibold text-gray-500">Add a post</h2>

        <input
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        />

        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value as BlogPostType)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="general">General</option>
          <option value="project-update">Project update</option>
        </select>

        {postType === "project-update" && (
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Select a project...</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        )}

        <textarea
          placeholder="Content — plain text for now, rich text editor coming later"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        />

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={publishNow}
            onChange={(e) => setPublishNow(e.target.checked)}
          />
          Publish immediately (uncheck to save as a draft)
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="self-start rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add post"}
        </button>
      </form>

      <h2 className="mb-3 text-sm font-semibold text-gray-500">
        Existing posts
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-gray-500">No posts yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between rounded border border-gray-200 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{post.title}</p>
                <p className="text-xs text-gray-500">
                  {post.post_type}
                  {" · "}
                  {post.published_at ? "published" : "draft"}
                  {" · "}/{post.slug}
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
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
