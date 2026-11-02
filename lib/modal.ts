/**
 * Open/close helpers for the header overlays.
 *
 * Modern browsers get the real top-layer modal. iOS Safari before 15.4 has no
 * HTMLDialogElement.showModal, so we fall back to the reflected `open`
 * attribute plus a CSS overlay (see `[data-fallback]` rules in globals.css).
 * Without this, tapping the trigger changes state but paints nothing.
 */

export const supportsNativeModal =
  typeof window !== "undefined" &&
  typeof window.HTMLDialogElement === "function" &&
  typeof window.HTMLDialogElement.prototype.showModal === "function";

export function openModal(dialog: HTMLDialogElement) {
  if (!dialog.open) {
    if (typeof dialog.showModal === "function") {
      try {
        dialog.showModal();
        return;
      } catch {
        // Fall through to the attribute-based overlay.
      }
    }
  }

  dialog.setAttribute("open", "");
  dialog.setAttribute("data-fallback", "");
  dialog.setAttribute("aria-modal", "true");
}

export function closeModal(dialog: HTMLDialogElement) {
  if (dialog.open && typeof dialog.close === "function") {
    try {
      dialog.close();
      return;
    } catch {
      // Fall through to the attribute-based overlay.
    }
  }

  dialog.removeAttribute("open");
  dialog.removeAttribute("data-fallback");
  dialog.removeAttribute("aria-modal");
}
