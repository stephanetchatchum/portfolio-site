import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDay } from "@/lib/format";

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
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-[calc(72px+3rem)] sm:px-8 lg:pb-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-[0.8125rem] text-muted transition-colors hover:text-cherenkov"
      >
        <span aria-hidden="true">&larr;</span> All posts
      </Link>

      <time
        dateTime={p.published_at ?? undefined}
        className="mt-8 block font-mono text-[0.8125rem] text-muted"
      >
        {formatDay(p.published_at)}
      </time>
      <h1 className="mt-4 max-w-[22ch] text-balance text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
        {p.title}
      </h1>
      <div className="ruler mt-8 max-w-[65ch]" aria-hidden="true" />
      <div className="mt-8 max-w-[65ch] whitespace-pre-wrap text-[1.0625rem] leading-[1.75] text-ink/90">
        {typeof p.content === "string" ? p.content : ""}
      </div>
    </article>
  );
}
