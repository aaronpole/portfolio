import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function SectionHeading({
  number,
  label,
  title,
  note,
}: {
  number: string;
  label: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <header>
      <div className="flex items-center gap-3">
        <span className="section-number">{number}</span>
        <span className="dot-leader" aria-hidden="true" />
        <span className="tag tag-pastel">{label}</span>
        <Sparkles className="size-4 shrink-0 text-accent" aria-hidden="true" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 className="font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-bold leading-[0.9] tracking-[-0.045em] lg:col-span-8">
          {title}
        </h2>
        {note ? (
          <p className="max-w-xs text-sm leading-6 text-ink-soft lg:col-span-3 lg:col-start-10">
            {note}
          </p>
        ) : null}
      </div>
    </header>
  );
}
