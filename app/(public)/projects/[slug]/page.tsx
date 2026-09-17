export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // TODO: fetch project by slug from Supabase
  return <main className="mx-auto max-w-3xl px-6 py-12">Project: {slug}</main>;
}
