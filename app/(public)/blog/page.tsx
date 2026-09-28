import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDay } from "@/lib/format";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Blog | Stephane Tchatchum Chassem" };

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
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-[calc(72px+4rem)] sm:px-8">
        <p className="panel px-6 py-8 text-[0.9375rem] text-muted">
          Couldn&apos;t load posts: {error.message}
        </p>
      </div>
    );
  }

  const list = (posts ?? []) as BlogPost[];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-[calc(72px+4rem)] sm:px-8 lg:pb-32">
      <SectionHeader
        id="blog-title"
        title="Blog"
        meta={list.length > 0 ? `${list.length} posts` : undefined}
      >
        Notes on what I&rsquo;m building and learning.
      </SectionHeader>

      {list.length === 0 ? (
        <p className="panel px-6 py-10 text-[0.9375rem] text-muted">
          No posts have been published yet.
        </p>
      ) : (
        <ul>
          {list.map((post) => (
            <li key={post.id} className="border-t border-line last:border-b">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <h2 className="text-[1.25rem] font-medium tracking-[-0.015em] text-ink transition-colors group-hover:text-cherenkov">
                  {post.title}
                </h2>
                <time
                  dateTime={post.published_at ?? undefined}
                  className="whitespace-nowrap font-mono text-[0.8125rem] text-muted"
                >
                  {formatDay(post.published_at)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
