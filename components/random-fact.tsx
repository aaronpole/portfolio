"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { facts } from "@/lib/facts";

/**
 * Pick the next fact, never repeating the previous one when there is a choice.
 */
function pickFactIndex(previous: number | null) {
  if (previous === null || facts.length < 2) {
    return Math.floor(Math.random() * facts.length);
  }

  const offset = 1 + Math.floor(Math.random() * (facts.length - 1));
  return (previous + offset) % facts.length;
}

export function RandomFact() {
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const lastIndexRef = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const closeRandomFact = useCallback(() => {
    setFlipped(false);
    setOpen(false);
  }, []);

  const openRandomFact = useCallback(() => {
    const nextIndex = pickFactIndex(lastIndexRef.current);
    lastIndexRef.current = nextIndex;
    setFactIndex(nextIndex);
    setFlipped(false);
    setOpen(true);
  }, []);

  // Use a regular React overlay rather than the native <dialog> element.
  // This avoids iOS Safari's inconsistent native-dialog hit testing while
  // keeping the modal, backdrop and card interactions under React control.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRandomFact();
        return;
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>(
            "#random-fact-dialog button:not([disabled])",
          ),
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open, closeRandomFact]);

  const number = String(factIndex + 1).padStart(2, "0");
  const fact = facts[factIndex];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openRandomFact}
        aria-haspopup="dialog"
        aria-controls="random-fact-dialog"
        className="random-fact-trigger chrome-pill"
      >
        Random fact
      </button>

      {portalReady &&
        open &&
        createPortal(
          <div
            className="random-fact-overlay"
            data-random-fact-backdrop
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeRandomFact();
              }
            }}
          >
            <div
              id="random-fact-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="random-fact-title"
              className="random-fact-dialog"
            >
              <h2 id="random-fact-title" className="sr-only">
                Random fact
              </h2>

              <div
                className="random-fact-panel"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeRandomFact}
                  aria-label="Close random fact"
                  className="random-fact-close"
                >
                  Close
                  <X className="size-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setFlipped((current) => !current)}
                  aria-label={
                    flipped
                      ? `Random fact ${number}: ${fact}`
                      : "Reveal random fact"
                  }
                  className="fact-card"
                  data-flipped={flipped}
                >
                  <span className="fact-card-inner">
                    <span
                      className="fact-face fact-face-front"
                      data-fact-face="front"
                      aria-hidden={flipped}
                    >
                      <span className="fact-front-meta">
                        <span className="eyebrow text-ink-soft">
                          Random fact
                        </span>
                        <span className="fact-marker" aria-hidden="true" />
                      </span>
                      <span className="fact-number">#{number}</span>
                    </span>

                    <span
                      className="fact-face fact-face-back"
                      data-fact-face="back"
                      data-fact-index={factIndex + 1}
                      aria-hidden={!flipped}
                    >
                      <span className="fact-back-meta">
                        <span className="eyebrow text-accent">#{number}</span>
                        <span className="eyebrow text-ink-faint">
                          Random fact
                        </span>
                      </span>
                      <span className="fact-text" data-fact-text>
                        {fact}
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
