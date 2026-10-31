import { Asterisk } from "lucide-react";

const items = [
  "Backend systems",
  "Football (i <3 real madrid)",
  "Data pipelines",
  "Product thinking",
  "Creative technology",
  "Guitar",
  "Pushing Limits",
];

export function Ticker() {
  return (
    <div
      className="ticker ticker-band mt-16 border-y border-ink/15 py-3 lg:mt-24"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="eyebrow flex items-center gap-6 px-6 text-ink-soft"
              >
                <Asterisk className="size-3 shrink-0 text-accent" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
