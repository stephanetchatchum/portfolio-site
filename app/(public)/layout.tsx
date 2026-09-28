import Link from "next/link";
import NavMark from "@/components/NavMark";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-hairline">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <NavMark />
            <div className="flex flex-col">
              <Link
                href="/"
                className="font-[family-name:var(--font-display)] text-base font-medium text-ink"
              >
                Stephane Tchatchum Chassem
              </Link>
              <span className="font-[family-name:var(--font-mono)] text-[0.68rem] text-muted">
                Yaoundé → Kigali → Computation
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-7 text-sm text-muted">
            <Link href="/projects" className="hover:text-ink">
              Work
            </Link>
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
            <Link href="/cv" className="hover:text-ink">
              CV
            </Link>
            <a
              href="https://github.com/stephanetchatchum"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded border border-hairline hover:border-status-shipped hover:text-status-shipped"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/stephane-tchatchum-7b4666383/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded border border-hairline hover:border-status-shipped hover:text-status-shipped"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M0 1.15C0 .52.53 0 1.19 0h13.62C15.47 0 16 .52 16 1.15v13.7c0 .63-.53 1.15-1.19 1.15H1.19C.53 16 0 15.48 0 14.85V1.15zM4.74 13.44V6.16H2.4v7.28h2.34zM3.57 5.17c.82 0 1.33-.54 1.33-1.22-.01-.7-.51-1.22-1.31-1.22-.8 0-1.33.53-1.33 1.22 0 .68.51 1.22 1.3 1.22h.01zm3.4 8.27V9.36c0-.22.02-.45.08-.6.18-.45.58-.91 1.26-.91.89 0 1.24.67 1.24 1.66v3.93h2.34V9.24c0-2.16-1.15-3.17-2.69-3.17-1.24 0-1.79.68-2.1 1.16h.02V6.16h-2.34c.03.65 0 7.28 0 7.28h2.19z" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-10 text-sm text-muted">
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