"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

/**
 * Render a modal dialog directly under <body> once the client has hydrated.
 *
 * Native <dialog> is promoted to the top layer, but iOS WebKit can fail to
 * paint it when an ancestor creates a compositing/containing block — the
 * sticky, backdrop-filtered header is exactly such an ancestor. Keeping the
 * dialogs outside that subtree avoids the bug. Rendering only on the client
 * keeps the server markup stable, so hydration stays clean.
 */
export function DialogPortal({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!isClient) return null;

  return createPortal(children, document.body);
}
