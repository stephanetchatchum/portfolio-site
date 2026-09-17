export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // TODO: fetch blog post by slug from Supabase
  return <main className="mx-auto max-w-3xl px-6 py-12">Post: {slug}</main>;
}
