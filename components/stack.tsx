import type { CSSProperties } from "react";
import { stack, tech, type TechId } from "@/lib/tech";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TechIcon } from "@/components/tech-icon";

const groups: Record<TechId, string> = {
  python: "Language",
  typescript: "Language",
  javascript: "Language",
  java: "Language",
  c: "Language",
  r: "Language",
  react: "Interface",
  nextjs: "Interface",
  node: "Server",
  express: "Server",
  fastapi: "Server",
  socketio: "Server",
  postgresql: "Data",
  git: "Tooling",
  github: "Tooling",
  bash: "Tooling",
};

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            number="04"
            label="Technology stack"
            title={
              <>
                The <em className="italic text-accent">bench.</em>
              </>
            }
            note="Sixteen tools, no percentages. Brand marks belong to their owners."
          />
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="eyebrow text-ink-faint">Specimen board</p>
            <p className="annotation">Hover for brand colour</p>
          </div>

          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {stack.map((id, index) => (
              <li
                key={id}
                className="tech-cell flex min-h-36 flex-col justify-between p-4 sm:min-h-40 sm:p-5"
                style={{ "--brand": tech[id].brand } as CSSProperties}
                title={tech[id].name}
              >
                <div className="flex items-start justify-between">
                  <TechIcon id={id} className="tech-logo size-8 sm:size-9" />
                  <span className="tech-index font-mono text-[0.6rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="eyebrow text-[0.52rem] text-ink-faint">
                    {groups[id]}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold leading-none tracking-[-0.03em] sm:text-xl">
                    {tech[id].name}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="annotation">16 specimens · updated 2026</p>
            <p className="annotation">Selected for use, not for looks.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
