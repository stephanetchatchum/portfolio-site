import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-hairline">
        <div className="mx-auto flex max-w-3xl items-baseline justify-between px-6 py-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-base font-medium text-ink"
          >
            Stephane Tchatchum Chassem
          </Link>
          <nav className="flex gap-7 text-sm text-muted">
            <Link href="/projects" className="hover:text-ink">
              Work
            </Link>
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
            <Link href="/cv" className="hover:text-ink">
              CV
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-10 text-sm text-muted">
          <span>Kigali, Rwanda</span>
          <Link
            href="/cv"
            className="rounded border border-hairline px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs text-ink transition-colors hover:border-status-shipped hover:text-status-shipped"
          >
            Download CV
          </Link>
        </div>
      </footer>
    </div>
  );
}
