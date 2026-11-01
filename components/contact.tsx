import { ArrowUpRight, Mail } from "lucide-react";
import { emailHref, links } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SocialIcon } from "@/components/social-icon";

const profiles = [
  {
    label: "Email",
    detail: "Send an email",
    href: emailHref,
    external: false,
    title: "Email Aaron Paul",
    icon: <Mail className="size-5" aria-hidden="true" />,
  },
  {
    label: "GitHub",
    detail: "Code & experiments",
    href: links.github,
    external: true,
    title: "Aaron Paul on GitHub",
    icon: <SocialIcon name="github" className="size-5" />,
  },
  {
    label: "LinkedIn",
    detail: "Work & background",
    href: links.linkedin,
    external: true,
    title: "Aaron Paul on LinkedIn",
    icon: <SocialIcon name="linkedin" className="size-5" />,
  },
  {
    label: "Instagram",
    detail: "Off the clock",
    href: links.instagram,
    external: true,
    title: "Aaron Paul on Instagram",
    icon: <SocialIcon name="instagram" className="size-5" />,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-ink/15 bg-paper-deep/35 py-16 sm:py-20 lg:py-28"
    >
      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="section-number">05</span>
          <span className="dot-leader" aria-hidden="true" />
          <span className="tag tag-pastel">Contact</span>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3.4rem,10vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.055em]">
              Say <em className="italic">hello.</em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-3" delay={0.06}>
            <p className="text-base leading-7 text-ink-soft">
              I&apos;m very open to internships, collaborations or maybe we can collab on a reel. text me on ig or hmu on my email. 
            </p>
            <p className="annotation mt-5">
              Based in Kochi, India · IST (UTC+5:30) · Usually replies within a
              day.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" delay={0.08}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {profiles.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                {...(profile.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                aria-label={`${profile.title} — ${profile.detail}`}
                title={profile.title}
                className="contact-tile group flex min-h-40 flex-col justify-between gap-8 p-5"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-full border border-ink/15 bg-paper-light/75 text-ink transition-colors group-hover:border-ink/35 group-hover:text-accent">
                    {profile.icon}
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold leading-none tracking-[-0.02em]">
                    {profile.label}
                  </span>
                  <span className="annotation mt-2 block">{profile.detail}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
