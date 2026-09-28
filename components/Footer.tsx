import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[0.9375rem] font-medium text-ink">{SITE.name}</p>
          <p className="mt-1 font-mono text-[0.8125rem] text-muted">
            {SITE.location} at {SITE.coordinates}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem]">
          <Link href="/projects" className="text-muted transition-colors hover:text-cherenkov">
            Projects
          </Link>
          <Link href="/blog" className="text-muted transition-colors hover:text-cherenkov">
            Blog
          </Link>
          {SITE.cvHref && (
            <Link
              href={SITE.cvHref}
              className="rounded-md border border-line-strong px-3 py-1.5 text-ink transition-colors hover:border-cherenkov/70 hover:text-cherenkov"
            >
              Download CV
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
