"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { emailHref, links, nav } from "@/lib/site";
import { RandomFact } from "@/components/random-fact";
import { SocialIcon } from "@/components/social-icon";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeIndex = useCallback(() => {
    setOpen(false);
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
  }, []);

  const openIndex = useCallback(() => {
    setOpen(true);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Lock background scrolling while open, restore on close
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeIndex();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeIndex]);

  const handleNavClick = (id: string) => {
    closeIndex();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    window.location.hash = id;
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/85 backdrop-blur-md">
        <div className="site-header-inner shell flex h-16 items-center justify-between gap-2 sm:gap-4">
          <a
            href="#top"
            className="group flex min-h-11 items-center gap-2.5 sm:gap-3 lg:min-h-0 shrink-0"
            aria-label="Aaron Paul — back to top"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg border border-ink bg-ink font-display text-sm font-bold leading-none text-paper transition-colors group-hover:border-accent group-hover:bg-accent"
            >
              ap
            </span>
            <span className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-bold leading-none tracking-[-0.03em] whitespace-nowrap">
                Aaron Paul
              </span>
              <span className="site-brand-note eyebrow mt-1 text-[0.66rem] text-ink-faint lg:text-[0.56rem] hidden sm:block">
                Field notes / 2026
              </span>
            </span>
          </a>

          <nav aria-label="Sections" className="hidden items-center md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-pill eyebrow inline-flex min-h-11 items-center px-3 py-2 text-ink-soft lg:min-h-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header-actions flex shrink-0 items-center gap-1.5 sm:gap-2">
            <RandomFact />
            <button
              type="button"
              onClick={openIndex}
              aria-expanded={open}
              aria-controls="site-index"
              aria-haspopup="dialog"
              className="tag px-3 py-2.5 shrink-0 whitespace-nowrap md:hidden touch-manipulation"
            >
              Index
              <Menu className="size-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <dialog
        id="site-index"
        ref={dialogRef}
        className="index-dialog"
        aria-labelledby="site-index-title"
        onCancel={() => {
          closeIndex();
        }}
        onClose={closeIndex}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeIndex();
        }}
      >
        <div className="shell flex h-full flex-col overflow-y-auto py-5">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <p id="site-index-title" className="eyebrow text-ink-soft">
              Index — Aaron Paul
            </p>
            <button
              type="button"
              onClick={closeIndex}
              className="inline-flex min-h-11 items-center gap-2 border border-ink/20 px-3 py-2 text-[0.65rem] font-mono uppercase tracking-[0.12em] transition-colors hover:border-ink lg:min-h-0 touch-manipulation"
            >
              Close
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Sections" className="flex flex-1 flex-col justify-center">
            <ul className="divide-y divide-ink/10">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className="group flex items-baseline justify-between gap-4 py-4 touch-manipulation"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow text-accent">{item.index}</span>
                      <span className="font-display text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-ink-faint transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-ink/15 pt-5">
            <p className="annotation">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Aaron Paul on GitHub"
                title="GitHub"
                className="tag hover:bg-ink hover:text-paper-light touch-manipulation"
              >
                <SocialIcon name="github" className="size-3.5" />
                GitHub
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Aaron Paul on LinkedIn"
                title="LinkedIn"
                className="tag hover:bg-ink hover:text-paper-light touch-manipulation"
              >
                <SocialIcon name="linkedin" className="size-3.5" />
                LinkedIn
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Aaron Paul on Instagram"
                title="Instagram"
                className="tag hover:bg-ink hover:text-paper-light touch-manipulation"
              >
                <SocialIcon name="instagram" className="size-3.5" />
                Instagram
              </a>
              <a
                href={emailHref}
                aria-label="Email Aaron Paul"
                title="Email"
                className="tag hover:bg-ink hover:text-paper-light touch-manipulation"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                Email
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
