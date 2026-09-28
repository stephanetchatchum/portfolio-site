import SectionHeader from "./SectionHeader";
import FieldTexture from "./FieldTexture";
import { EXPLORING, QUESTIONS } from "@/lib/site";

const ACCENT_DOT: Record<string, string> = {
  cherenkov: "bg-cherenkov",
  plasma: "bg-plasma",
  biosphere: "bg-biosphere",
  atmosphere: "bg-atmosphere",
  spectral: "bg-spectral",
};

export default function ExplorationSection() {
  return (
    <section
      id="exploring"
      aria-labelledby="exploring-title"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
    >
      <SectionHeader id="exploring-title" title="Currently exploring">
        Where I&rsquo;m heading, not where I&rsquo;ve arrived. These are the
        areas I&rsquo;m studying and building toward.
      </SectionHeader>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <ul className="lg:col-span-7">
          {EXPLORING.map((item) => (
            <li
              key={item.title}
              className="grid gap-1 border-t border-line py-5 last:border-b sm:grid-cols-[13rem_1fr] sm:gap-8"
            >
              <h3 className="flex items-center gap-2.5 text-[1.0625rem] font-medium tracking-[-0.01em] text-ink">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${ACCENT_DOT[item.accent] ?? "bg-cherenkov"}`}
                  aria-hidden="true"
                />
                {item.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                {item.note}
              </p>
            </li>
          ))}
        </ul>

        <aside className="panel brackets relative overflow-hidden p-6 sm:p-8 lg:col-span-5">
          <FieldTexture className="pointer-events-none absolute inset-0 h-full w-full text-cherenkov opacity-[0.42] [mask-image:linear-gradient(200deg,#000_0%,transparent_55%)]" />
          <div className="relative">
            <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">
              What I&rsquo;m trying to understand
            </h3>
            <p className="mt-2 text-[0.9375rem] text-muted">
              The questions the projects keep circling.
            </p>
            <ul className="mt-6">
              {QUESTIONS.map((q) => (
                <li
                  key={q}
                  className="border-t border-line py-4 text-[0.9375rem] leading-relaxed text-ink"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
