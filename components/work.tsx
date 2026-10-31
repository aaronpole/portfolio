import { ArrowUpRight } from "lucide-react";
import { links, projects } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            number="02"
            label="Selected projects"
            title={
              <>
                Three builds,{" "}
                <em className="italic text-accent">three lessons.</em>
              </>
            }
            note="Schematic plates, not screenshots. Each one explains the system, not the interface."
          />
        </Reveal>

        <div className="mt-14">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={0.03}>
              <ProjectCard project={project} reversed={index % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
          <p className="annotation">Small experiments and unfinished ideas live on GitHub.</p>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            More on GitHub
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
