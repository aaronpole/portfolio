import Image from "next/image";
import { interests } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            number="01"
            label="About"
            title={
              <>
                A little of{" "}
                <em className="italic text-accent">everything</em>, on purpose.
              </>
            }
            note="Dabbling across disciplines, with Leonardo as the reference point."
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <Reveal className="lg:col-span-6">
            <div className="space-y-6 text-lg leading-8 text-ink-soft">
              <p className="text-ink">
                I&apos;m Aaron Paul, a 3rd year Computer Science and Business Systems
                student at Model Engineering College, Thrikkakara.
              </p>
              <p>
                I like dabbling. One week it&apos;s a backend API, the next
                it&apos;s a data pipeline, a game server, or a layout that needs
                one more pass. The fun is in borrowing a little from another
                field and bringing it back to whatever I&apos;m building.
              </p>
              <p>
                Leonardo da Vinci is the reference point: the quintessential
                polymath, moving between art, science, engineering and
                everything in between without treating them as separate rooms.
                I&apos;m not claiming the range - just chasing the curiosity.
              </p>
            </div>

            <div className="mt-8 border-t border-ink/15 pt-6">
              <p className="eyebrow text-ink-faint">Field list</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <li key={interest} className="tag">
                    <span className="text-accent" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              <span
                aria-hidden="true"
                className="absolute -top-3 left-8 z-20 h-6 w-24 -rotate-3 border border-[#c9b892]/70 bg-[#e8dab8]/85 shadow-[0_1px_2px_rgba(26,23,18,0.16)]"
              />
              <span
                aria-hidden="true"
                className="absolute -top-2 right-10 z-20 h-5 w-16 rotate-2 border border-[#c9b892]/70 bg-[#e8dab8]/85 shadow-[0_1px_2px_rgba(26,23,18,0.16)]"
              />
              <span className="sticker absolute -right-3 -top-4 z-30">
                Polymath
              </span>

              <div className="vitruvian-frame relative rounded-[4px] border border-ink/25 p-2.5 sm:p-3">
                <div className="flex items-center justify-between border-b border-ink/20 px-1 pb-2">
                  <span className="eyebrow text-[0.55rem] text-ink-soft">
                    Plate 02
                  </span>
                  <span className="eyebrow text-[0.55rem] text-ink-faint">
                    Notebook leaf
                  </span>
                </div>

                <div className="crop-marks relative mt-2.5 overflow-hidden bg-[#e7dcc3]">
                  <Image
                    src="/images/vitruvian-man.jpg"
                    alt="Leonardo da Vinci's Vitruvian Man: a pen-and-ink study of a male figure inscribed in a circle and a square, with mirrored handwritten notes."
                    width={1280}
                    height={1774}
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 90vw"
                    className="h-auto w-full saturate-[0.82] sepia-[0.18] contrast-[1.04]"
                  />

                  <svg
                    viewBox="0 0 1280 1774"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 size-full"
                  >
                    <circle
                      cx="640"
                      cy="880"
                      r="590"
                      fill="none"
                      stroke="var(--color-pencil)"
                      strokeOpacity="0.28"
                      strokeWidth="3"
                      strokeDasharray="5 12"
                    />
                    <line
                      x1="640"
                      y1="180"
                      x2="640"
                      y2="1580"
                      stroke="var(--color-pencil)"
                      strokeOpacity="0.16"
                      strokeWidth="2"
                    />
                    <line
                      x1="80"
                      y1="880"
                      x2="1200"
                      y2="880"
                      stroke="var(--color-pencil)"
                      strokeOpacity="0.16"
                      strokeWidth="2"
                    />
                  </svg>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0,transparent_97%,rgba(26,23,18,0.06)_97%)] bg-[length:100%_22px] mix-blend-multiply"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_55%,rgba(26,23,18,0.16))] mix-blend-multiply"
                  />
                </div>

                <div className="mt-2.5 flex items-start justify-between gap-3 border-t border-ink/20 px-1 pt-2">
                  <p className="annotation text-[0.55rem] leading-4">
                    Leonardo da Vinci, <em>Vitruvian Man</em>, c. 1490.
                    <br />
                    Pen, ink &amp; metalpoint. Public domain.
                  </p>
                  <p className="annotation shrink-0 text-[0.55rem]">Fig. II</p>
                </div>
              </div>

              <figcaption className="annotation mt-3 flex items-baseline justify-between gap-4">
                <span>Art · anatomy · engineering · one notebook.</span>
                <span className="shrink-0 text-ink-faint">c. 1490</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
