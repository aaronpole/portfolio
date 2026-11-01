"use client";

import { useEffect, useRef, useState } from "react";
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
  const [factIndex, setFactIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function openRandomFact() {
    const nextIndex = pickFactIndex(lastIndexRef.current);
    lastIndexRef.current = nextIndex;
    setFactIndex(nextIndex);
    setFlipped(false);
    setOpen(true);
  }

  function closeRandomFact() {
    setOpen(false);
  }

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

      <dialog
        id="random-fact-dialog"
        ref={dialogRef}
        className="random-fact-dialog"
        aria-labelledby="random-fact-title"
        onClose={() => {
          setOpen(false);
          setFlipped(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeRandomFact();
        }}
      >
        <h2 id="random-fact-title" className="sr-only">
          Random fact
        </h2>

        <div className="random-fact-panel">
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
              flipped ? `Random fact ${number}: ${fact}` : "Reveal random fact"
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
    </>
  );
}
