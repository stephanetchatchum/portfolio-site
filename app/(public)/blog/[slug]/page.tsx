import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { BlogPost } from "@/lib/types";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .single();

  if (error || !post) {
    notFound();
  }

  const p = post as BlogPost;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.78rem] text-muted">
        {p.published_at &&
          new Date(p.published_at).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
      </p>
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-medium text-ink">
        {p.title}
      </h1>
      <div className="max-w-[65ch] whitespace-pre-wrap text-[1.02rem] leading-[1.7] text-ink/90">
        {typeof p.content === "string" ? p.content : ""}
      </div>
    </div>
  );
}
