import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm text-muted">
          Couldn&apos;t load posts: {error.message}
        </p>
      </div>
    );
  }

  const list = (posts ?? []) as BlogPost[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-medium text-ink">
        Blog
      </h1>

      {list.length === 0 ? (
        <p className="text-sm text-muted">No posts published yet.</p>
      ) : (
        <div className="border-t border-hairline">
          {list.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-baseline justify-between gap-5 border-b border-hairline py-6 no-underline"
            >
              <h2 className="font-[family-name:var(--font-display)] text-[1.1rem] font-medium text-ink">
                {post.title}
              </h2>
              <span className="whitespace-nowrap font-[family-name:var(--font-mono)] text-[0.78rem] text-muted">
                {post.published_at &&
                  new Date(post.published_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
