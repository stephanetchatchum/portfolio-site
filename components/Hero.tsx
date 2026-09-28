import Link from "next/link";
import OrbitField from "./OrbitField";
import ButtonLink from "./ButtonLink";
import { SITE } from "@/lib/site";

interface HeroProps {
  currentTitle?: string | null;
  currentHref?: string | null;
  total: number;
  building: number;
}

export default function Hero({ currentTitle, currentHref, total, building }: HeroProps) {
  const facts = [
    { label: "Based in", value: SITE.location },
    { label: "Studying", value: "BSc Software Engineering, ALU" },
    { label: "Working toward", value: "Computational physics" },
    {
      label: "Projects",
      value:
        total === 0
          ? "None logged yet"
          : `${total} logged${building > 0 ? `, ${building} in development` : ""}`,
    },
  ];

  const pill = (
    <>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span
          className={`pulse-ring relative inline-block h-2 w-2 rounded-full ${
            currentTitle ? "bg-plasma" : "bg-cherenkov"
          }`}
        />
      </span>
      {currentTitle ? (
        <span>
          Currently building <span className="text-ink">{currentTitle}</span>
        </span>
      ) : (
        <span>Student, {SITE.location}</span>
      )}
    </>
  );

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <div className="grid-field absolute inset-0 -z-30" aria-hidden="true" />
      <OrbitField className="absolute inset-0 -z-20 h-full w-full" />
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true" />

      <div className="brackets panel absolute bottom-8 left-5 z-10 hidden w-[104px] overflow-hidden sm:left-8 sm:block lg:w-[120px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photo.jpg"
          alt="Stephane Tchatchum Chassem"
          className="aspect-[3/4] w-full object-cover grayscale-[15%]"
        />
        <p className="border-t border-line px-2 py-1.5 font-mono text-[0.625rem] text-dim">
          {SITE.location}
        </p>
      </div>

      <div className="mx-auto flex min-h-[min(100svh,900px)] max-w-6xl flex-col px-5 pb-10 pt-[calc(72px+3.5rem)] sm:px-8 sm:pt-[calc(72px+5rem)]">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="rise" style={{ "--i": 0 } as React.CSSProperties}>
            {currentTitle && currentHref ? (
              <Link
                href={currentHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-vacuum/60 px-4 py-2 text-left font-mono text-[0.8125rem] text-muted backdrop-blur transition-colors hover:border-plasma/60"
              >
                {pill}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-vacuum/60 px-4 py-2 text-left font-mono text-[0.8125rem] text-muted backdrop-blur">
                {pill}
              </span>
            )}
          </div>

          <h1
            id="hero-title"
            className="rise mt-8 max-w-[15ch] text-balance text-[clamp(2.75rem,8.4vw,7rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink sm:max-w-[16ch]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            What I can&rsquo;t solve on paper,{" "}
            <span className="text-cherenkov [text-shadow:0_0_48px_rgb(0_210_255/0.28)]">
              I simulate.
            </span>
          </h1>

          <p
            className="rise mt-8 max-w-[58ch] text-pretty text-[1.0625rem] leading-relaxed text-muted sm:text-[1.1875rem]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            I&rsquo;m Stephane, a software engineering student at ALU in Kigali,
            originally from Cameroon. I build orbit and N-body simulations, and
            I&rsquo;m learning the numerical methods, physics and mathematics
            behind them, with the aim of working in computational science.
          </p>

          <div
            className="rise mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <ButtonLink href="/#projects" variant="primary">
              View projects
            </ButtonLink>
            <ButtonLink href="/#contact">Get in touch</ButtonLink>
          </div>
        </div>

        <dl
          className="rise panel mt-14 grid grid-cols-2 lg:grid-cols-4"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`px-5 py-4 text-left ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l" : ""
              } lg:border-line`}
            >
              <dt className="font-mono text-[0.75rem] text-muted">{f.label}</dt>
              <dd className="mt-1 text-[0.9375rem] leading-snug text-ink">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
