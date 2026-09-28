"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavMark from "./NavMark";
import ButtonLink from "./ButtonLink";
import { NAV_LINKS, SITE } from "@/lib/site";

const GITHUB_PATH =
  "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z";
const LINKEDIN_PATH =
  "M0 1.15C0 .52.53 0 1.19 0h13.62C15.47 0 16 .52 16 1.15v13.7c0 .63-.53 1.15-1.19 1.15H1.19C.53 16 0 15.48 0 14.85V1.15zM4.74 13.44V6.16H2.4v7.28h2.34zM3.57 5.17c.82 0 1.33-.54 1.33-1.22-.01-.7-.51-1.22-1.31-1.22-.8 0-1.33.53-1.33 1.22 0 .68.51 1.22 1.3 1.22h.01zm3.4 8.27V9.36c0-.22.02-.45.08-.6.18-.45.58-.91 1.26-.91.89 0 1.24.67 1.24 1.66v3.93h2.34V9.24c0-2.16-1.15-3.17-2.69-3.17-1.24 0-1.79.68-2.1 1.16h.02V6.16h-2.34c.03.65 0 7.28 0 7.28h2.19z";

function SocialLink({ href, label, path }: { href: string; label: string; path: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-cherenkov/60 hover:text-cherenkov"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = SITE.cvHref
    ? [...NAV_LINKS, { label: "CV", href: SITE.cvHref }]
    : NAV_LINKS;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-vacuum/85"
          : "border-transparent bg-vacuum/50"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <NavMark />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[0.9375rem] font-semibold tracking-tight text-ink">
              {SITE.name}
            </span>
            <span className="hidden truncate font-mono text-[0.75rem] text-muted sm:block">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[0.9375rem] text-muted transition-colors hover:text-cherenkov"
            >
              {l.label}
            </Link>
          ))}
          <span className="flex items-center gap-2">
            <SocialLink href={SITE.github.href} label="GitHub" path={GITHUB_PATH} />
            <SocialLink href={SITE.linkedin.href} label="LinkedIn" path={LINKEDIN_PATH} />
          </span>
          <ButtonLink href="/#contact" variant="primary" className="!px-4 !py-2">
            Get in touch
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink transition-colors hover:border-cherenkov/70 hover:text-cherenkov lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-[72px] border-b border-line bg-vacuum shadow-[0_24px_40px_-12px_rgb(0_0_0/0.6)] lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {links.map((l) => (
              <li key={l.label} className="border-b border-line last:border-b-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg text-ink transition-colors hover:text-cherenkov"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 py-4">
              <SocialLink href={SITE.github.href} label="GitHub" path={GITHUB_PATH} />
              <SocialLink href={SITE.linkedin.href} label="LinkedIn" path={LINKEDIN_PATH} />
              <ButtonLink
                href="/#contact"
                variant="primary"
                className="ml-auto !px-4 !py-2"
              >
                Get in touch
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
