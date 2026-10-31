import { siRedbull } from "simple-icons";
import { experience } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            number="03"
            label="Experience & leadership"
            title={
              <>
                Elsewhere, <em className="italic">on the ground.</em>
              </>
            }
            note="Three rooms where the work was mostly about people."
          />
        </Reveal>

        <div className="mt-14 border-t border-ink/15">
          {experience.map((item, index) => (
            <Reveal key={`${item.role}-${item.org}`} delay={index * 0.04}>
              <article className="grid gap-3 border-b border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="eyebrow text-accent md:col-span-1">
                  {item.index}
                </span>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.03em] md:col-span-5 md:text-3xl">
                  {item.role}{" "}
                  <span className="text-ink-faint" aria-hidden="true">
                    /
                  </span>{" "}
                  <span className="inline-flex items-center gap-2 align-middle italic text-ink-soft">
                    {item.org === "Red Bull" ? (
                      <span
                        aria-hidden="true"
                        className="inline-grid size-6 shrink-0 place-items-center rounded-full border border-ink/15 bg-white shadow-[0_1px_2px_rgba(26,23,18,0.18)]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 text-redbull"
                          focusable="false"
                        >
                          <path d={siRedbull.path} fill="currentColor" />
                        </svg>
                      </span>
                    ) : null}
                    {item.org}
                  </span>
                </h3>
                <p className="text-sm leading-6 text-ink-soft md:col-span-4">
                  {item.description}
                </p>
                <p className="annotation md:col-span-2 md:text-right">
                  {item.period || "—"}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
