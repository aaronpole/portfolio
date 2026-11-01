import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { emailHref, intro, links } from "@/lib/site";
import { SocialIcon } from "@/components/social-icon";

const socials = [
  {
    label: "GitHub",
    href: links.github,
    external: true,
    icon: <SocialIcon name="github" className="size-4" />,
  },
  {
    label: "LinkedIn",
    href: links.linkedin,
    external: true,
    icon: <SocialIcon name="linkedin" className="size-4" />,
  },
  {
    label: "Instagram",
    href: links.instagram,
    external: true,
    icon: <SocialIcon name="instagram" className="size-4" />,
  },
  {
    label: "Email",
    href: emailHref,
    external: false,
    icon: <Mail className="size-4" aria-hidden="true" />,
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-8 sm:pt-12 lg:pt-14">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4">
          <p className="eyebrow text-ink-soft">
            Field notes <span className="mx-1 text-accent">/</span> Vol. 01
          </p>
          <p className="eyebrow text-ink-faint">Portfolio 2026</p>
        </div>

        <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="tag tag-pastel">
                <span
                  className="size-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {intro.role}
              </span>
              <span className="sticker">
                <Sparkles className="size-3" aria-hidden="true" />
                Open to internships
              </span>
            </div>

            <div className="relative mt-6">
              <h1 className="hero-name">
                <span className="hero-line">Aaron</span>
                <span className="hero-line">
                  Paul<span className="text-accent">.</span>
                </span>
              </h1>
              <Sparkles
                className="absolute -top-1 right-2 size-6 text-accent sm:size-8"
                aria-hidden="true"
              />
            </div>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">
              {intro.statement}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="chrome-pill group inline-flex items-center gap-2.5 px-3.5 py-2.5 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-ink"
                  >
                    {social.icon}
                    {social.label}
                    <ArrowUpRight
                      className="size-3 text-ink-faint transition-colors group-hover:text-paper"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-4 lg:col-start-9 lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-6 z-10 h-6 w-24 -rotate-3 border border-[#c9b892]/70 bg-[#e8dab8]/85 shadow-[0_1px_2px_rgba(26,23,18,0.16)]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-2 right-8 z-10 h-5 w-16 rotate-2 border border-[#c9b892]/70 bg-[#e8dab8]/85 shadow-[0_1px_2px_rgba(26,23,18,0.16)]"
            />

            <div className="relative border border-ink/25 bg-paper-deep p-2 shadow-[0_18px_40px_-28px_rgba(26,23,18,0.55)]">
              <div className="crop-marks relative aspect-[4/5] overflow-hidden bg-paper-deep">
                <div className="absolute inset-2.5 overflow-hidden bg-[#e4d8c2] sm:inset-3">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Aaron Paul standing in front of a mirror in a red T-shirt, holding a phone."
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 92vw"
                    className="image-warm object-contain object-center"
                    preload
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_0%,transparent_58%,rgba(26,23,18,0.22))] mix-blend-multiply"
                  />
                </div>
                <span className="absolute right-4 top-4 border border-paper/50 bg-ink/45 px-2 py-1 text-[0.66rem] font-mono uppercase tracking-[0.16em] text-paper backdrop-blur-sm lg:text-[0.55rem]">
                  Plate 01
                </span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-7 -left-2 z-20 grid size-24 place-items-center rounded-full border border-accent/40 bg-paper text-accent shadow-[0_10px_24px_-12px_rgba(26,23,18,0.45)] sm:-left-6 sm:size-28"
            >
              <svg viewBox="0 0 100 100" className="stamp-spin absolute inset-0 size-full">
                <defs>
                  <path
                    id="stamp-path"
                    d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                    fill="none"
                  />
                </defs>
                <text
                  fontSize="7.4"
                  letterSpacing="1.15"
                  fill="currentColor"
                  fontFamily="var(--font-mono)"
                >
                  <textPath href="#stamp-path" startOffset="0">
                    AARON PAUL · DEVELOPER · FIELD NOTES ·
                  </textPath>
                </text>
              </svg>
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path
                  d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>

            <figcaption className="annotation mt-4 flex items-baseline justify-between gap-4">
              <span></span>
              <span className="shrink-0 text-ink-faint">4:5</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-ink/15 pt-4 lg:mt-20">
          <p className="annotation">A portfolio, not a résumé.</p>
          <a
            href="#about"
            className="eyebrow inline-flex min-h-11 items-center gap-2 text-ink transition-colors hover:text-accent lg:min-h-0"
          >
            Read on
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
