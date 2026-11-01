"use client";

import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={className}
      data-reveal=""
      style={{
        opacity: 1,
        transform: "none",
      }}
    >
      {children}
    </div>
  );
}
