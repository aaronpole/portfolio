"use client";

import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent;
  const isWebKit = /AppleWebKit\//.test(userAgent) && !/Chrome\//.test(userAgent);
  return !isWebKit && "IntersectionObserver" in window;
}

function getServerSnapshot() {
  return false;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const canAnimate = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!canAnimate) {
    return (
      <div className={className} data-reveal="" style={{ opacity: 1, transform: "none" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.05 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
