import SectionHeader from "./SectionHeader";
import WaveTexture from "./WaveTexture";
import { SITE } from "@/lib/site";

const CHANNELS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, external: false },
  { label: "GitHub", value: SITE.github.label, href: SITE.github.href, external: true },
  { label: "LinkedIn", value: SITE.linkedin.label, href: SITE.linkedin.href, external: true },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-line"
    >
      <div className="grid-field absolute inset-0 -z-20" aria-hidden="true" />
      <WaveTexture className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 w-full text-cherenkov opacity-[0.32] [mask-image:linear-gradient(to_right,transparent,#000_25%,#000_75%,transparent)]" />

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeader id="contact-title" title="Get in touch">
          I&rsquo;m a student, so questions, corrections and ideas for
          collaboration are all welcome.
        </SectionHeader>

        <ul className="grid gap-4 md:grid-cols-3">
          {CHANNELS.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="panel brackets block h-full p-5"
              >
                <span className="block font-mono text-[0.8125rem] text-muted">
                  {c.label}
                  {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
                <span className="mt-2 block break-words text-[1rem] text-ink">
                  {c.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
