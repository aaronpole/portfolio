import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-ink/15 py-8">
      <div className="shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-md border border-ink bg-ink font-display text-xs font-bold leading-none text-paper"
          >
            ap
          </span>
          <p className="annotation">© 2026 Aaron Paul</p>
        </div>

        <p className="annotation">
          Set in Helvetica &amp; JetBrains Mono.
        </p>

        <a
          href="#top"
          className="eyebrow inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUp className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
