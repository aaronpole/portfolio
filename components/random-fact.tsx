"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { facts } from "@/lib/facts";
import { DialogPortal } from "@/components/dialog-portal";
import {
  closeModal,
  openModal,
  supportsNativeModal,
} from "@/lib/modal";

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
  const [factIndex, setFactIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastIndexRef = useRef<number | null>(null);

  const closeRandomFact = useCallback(() => {
    setOpen(false);
  }, []);

  const openRandomFact = useCallback(() => {
    const nextIndex = pickFactIndex(lastIndexRef.current);
    lastIndexRef.current = nextIndex;
    setFactIndex(nextIndex);
    setFlipped(false);
    setOpen(true);
  }, []);

  // Single source of truth: React state drives the native dialog lifecycle.
  // Portaling to <body> keeps the top layer out of the backdrop-filtered header,
  // and openModal() covers browsers without HTMLDialogElement.showModal.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      openModal(dialog);
    } else {
      closeModal(dialog);
    }
  }, [open]);

  // Legacy fallback has no native `cancel` event, so supply Escape there.
  useEffect(() => {
    if (!open || supportsNativeModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRandomFact();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeRandomFact]);

  // Reset the flip on dismissal without setting state inside an effect.
  const handleDialogClose = useCallback(() => {
    setOpen(false);
    setFlipped(false);
  }, []);

  // Lock background scrolling while open, restore on close. The root element
  // is the viewport scroller in WebKit, so it has to be locked as well.
  useEffect(() => {
    if (open) {
      const bodyOverflow = document.body.style.overflow;
      const htmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = bodyOverflow;
        document.documentElement.style.overflow = htmlOverflow;
      };
    }
  }, [open]);

  const number = String(factIndex + 1).padStart(2, "0");
  const fact = facts[factIndex];

  return (
    <>
      <button
        type="button"
        onClick={openRandomFact}
        aria-haspopup="dialog"
        aria-controls="random-fact-dialog"
        className="random-fact-trigger chrome-pill"
      >
        Random fact
      </button>

      <DialogPortal>
        <dialog
          id="random-fact-dialog"
          ref={dialogRef}
          className="random-fact-dialog"
          aria-labelledby="random-fact-title"
          onCancel={(event) => {
            // Take over native Escape dismissal so the state effect is the only
            // thing that closes the dialog (no duplicate close calls).
            event.preventDefault();
            closeRandomFact();
          }}
          onClose={handleDialogClose}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeRandomFact();
              return;
            }
            const rect = event.currentTarget.getBoundingClientRect();
            const isInside =
              rect.top <= event.clientY &&
              event.clientY <= rect.bottom &&
              rect.left <= event.clientX &&
              event.clientX <= rect.right;
            if (!isInside) {
              closeRandomFact();
            }
          }}
        >
          <h2 id="random-fact-title" className="sr-only">
            Random fact
          </h2>

          <div
            className="random-fact-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
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
                    <span className="eyebrow text-ink-soft">Random fact</span>
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
                    <span className="eyebrow text-ink-faint">Random fact</span>
                  </span>
                  <span className="fact-text" data-fact-text>
                    {fact}
                  </span>
                </span>
              </span>
            </button>
          </div>
        </dialog>
      </DialogPortal>
    </>
  );
}
