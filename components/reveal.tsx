"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealState = "idle" | "pending" | "shown";

/**
 * Layout effects cannot run during SSR; falling back to the regular effect on
 * the server keeps React quiet. On the client this runs before the browser
 * paints, so below-the-fold content is hidden before it can flash into view.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  // Only arm the animation for content that is currently below the fold. If
  // the observer, hydration or JavaScript never gets that far the element
  // keeps its default (visible) state.
  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      prefersReducedMotion ||
      typeof window.IntersectionObserver !== "function"
    ) {
      return;
    }

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const top = node.getBoundingClientRect().top;

    // Already on screen: leave it visible instead of hiding it after paint.
    if (top < viewportHeight * 0.92) return;

    setState("pending");
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reveal on the section boundary rather than on every child, so a tall
    // section animates as one composed block and never leaves an off-screen
    // child permanently transparent.
    const target = node.closest("section") ?? node;

    const isInView = () => {
      const rect = target.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      return rect.top < viewportHeight * 0.92 && rect.bottom > 0;
    };

    let done = false;
    let failsafe = 0;
    let observer: IntersectionObserver | null = null;

    const stopWatching = () => {
      observer?.disconnect();
      observer = null;
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (failsafe) window.clearTimeout(failsafe);
      failsafe = 0;
    };

    const show = () => {
      if (done) return;
      done = true;
      setState("shown");
      stopWatching();
    };

    const check = () => {
      if (isInView()) show();
    };

    // Nothing to animate (or it is already visible): settle immediately.
    if (isInView()) {
      show();
      return;
    }

    if (typeof window.IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) show();
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0 },
      );
      observer.observe(target);
    }

    // Passive fallback for browsers where the observer never fires and for
    // geometry changes that happen without a scroll event.
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    // Last-resort guarantee: content can never stay hidden forever, even if
    // both the observer and the scroll fallback fail.
    failsafe = window.setTimeout(show, 5000);

    return () => {
      stopWatching();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={state}
      style={
        {
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
