import { ArrowUpRight, Globe } from "lucide-react";
import { tech } from "@/lib/tech";
import type { Project } from "@/lib/site";
import { ProjectVisual } from "@/components/project-visuals";
import { SocialIcon } from "@/components/social-icon";
import { TechIcon } from "@/components/tech-icon";

export function ProjectCard({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  return (
    <article
      className="project-row border-t border-ink/15 py-12 lg:py-16"
      aria-labelledby={`${project.id}-title`}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div
          className={
            reversed
              ? "lg:col-span-5 lg:col-start-8"
              : "lg:col-span-5"
          }
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="section-number">{project.index}</span>
            <span className="dot-leader max-w-8" aria-hidden="true" />
            <span className="tag">{project.category}</span>
          </div>

          <h3
            id={`${project.id}-title`}
            className="mt-5 font-display text-[clamp(2.6rem,5vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.045em]"
          >
            {project.title}
          </h3>

          <p className="mt-6 max-w-md text-base leading-7 text-ink-soft">
            {project.summary}
          </p>

          <p className="annotation mt-4 max-w-sm">
            <span className="text-accent" aria-hidden="true">
              *{" "}
            </span>
            {project.note}
          </p>

          <ul
            className="mt-7 flex flex-wrap gap-2"
            aria-label={`${project.title} technologies`}
          >
            {project.tech.map((id) => (
              <li key={id} className="tag">
                <TechIcon id={id} className="size-3.5 text-ink/80" />
                <span>{tech[id].name}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} live site`}
                title={`Open the ${project.title} live site`}
                className="chrome-pill group inline-flex items-center gap-2 px-4 py-2.5 text-[0.62rem] font-mono uppercase tracking-[0.12em] text-ink"
              >
                <Globe className="size-3.5" aria-hidden="true" />
                Live site
                <ArrowUpRight
                  className="size-3 text-ink-faint transition-colors group-hover:text-paper"
                  aria-hidden="true"
                />
              </a>
            ) : null}

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              title={`View ${project.title} source on GitHub`}
              className="tag group hover:bg-ink hover:text-paper-light"
            >
              <SocialIcon name="github" className="size-3.5" />
              Source
              <ArrowUpRight
                className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div
          className={
            reversed
              ? "lg:col-span-7 lg:col-start-1 lg:row-start-1"
              : "lg:col-span-7"
          }
        >
          <ProjectVisual
            visual={project.visual}
            caption={project.caption}
            plate={project.index}
          />
        </div>
      </div>
    </article>
  );
}
