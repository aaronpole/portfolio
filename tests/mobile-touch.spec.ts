import { expect, test } from "@playwright/test";
import { facts } from "../lib/facts";

/**
 * Touch-only regression coverage for the two header overlays. This runs in both
 * configured browser projects with a phone-sized, touch-enabled context; it is
 * browser emulation, not physical-device validation.
 */
test.describe("mobile touch interactions", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  test("Random Fact opens, flips, closes and dismisses on backdrop by tap", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: "Random fact",
      exact: true,
    });
    await expect(trigger).toBeVisible();
    await trigger.tap();

    const dialog = page.getByRole("dialog", { name: "Random fact" });
    await expect(dialog).toBeVisible();

    const front = dialog.locator('[data-fact-face="front"]');
    const back = dialog.locator('[data-fact-face="back"]');
    await expect(front).toBeVisible();
    await expect(back).toBeHidden();

    const numberText = (
      await dialog.locator(".fact-number").innerText()
    ).trim();
    const match = /^#(\d{2})$/.exec(numberText);
    expect(match).not.toBeNull();

    await dialog.locator(".fact-card").tap();
    await expect(back).toBeVisible();
    await expect(front).toBeHidden();
    await expect(back.locator("[data-fact-text]")).toHaveText(
      facts[Number(match![1]) - 1],
    );

    await dialog.getByRole("button", { name: "Close random fact" }).tap();
    await expect(dialog).toBeHidden();
    await expect
      .poll(() =>
        page.evaluate(
          () => getComputedStyle(document.documentElement).overflow,
        ),
      )
      .not.toBe("hidden");

    // Backdrop tap dismisses too.
    await trigger.tap();
    await expect(dialog).toBeVisible();
    await page.touchscreen.tap(4, 4);
    await expect(dialog).toBeHidden();
  });

  test("Index opens, navigates and dismisses on backdrop by tap", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Index" });
    await expect(trigger).toBeVisible();
    await trigger.tap();

    const dialog = page.getByRole("dialog", { name: /Index/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("a[href^='#']")).toHaveCount(5);

    await dialog.locator('a[href="#work"]').tap();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator("#work")).toBeInViewport();
    await expect
      .poll(() =>
        page.evaluate(
          () => getComputedStyle(document.documentElement).overflow,
        ),
      )
      .not.toBe("hidden");
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    // Reopen and dismiss by tapping the dialog's own padding area.
    await trigger.tap();
    await expect(dialog).toBeVisible();
    await page.touchscreen.tap(4, 4);
    await expect(dialog).toBeHidden();
  });

  test("overlays open and close where showModal is unavailable", async ({
    page,
  }) => {
    // Emulates iOS Safari before 15.4, which has no HTMLDialogElement.showModal.
    await page.addInitScript(() => {
      const proto = window.HTMLDialogElement?.prototype;
      if (!proto) return;
      Object.defineProperty(proto, "showModal", {
        value: undefined,
        configurable: true,
      });
      Object.defineProperty(proto, "close", {
        value: undefined,
        configurable: true,
      });
    });

    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: "Random fact",
      exact: true,
    });
    await trigger.tap();

    const dialog = page.getByRole("dialog", { name: "Random fact" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("data-fallback", "");

    const front = dialog.locator('[data-fact-face="front"]');
    const back = dialog.locator('[data-fact-face="back"]');
    await expect(front).toBeVisible();
    await dialog.locator(".fact-card").tap();
    await expect(back).toBeVisible();

    await dialog.getByRole("button", { name: "Close random fact" }).tap();
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Index" }).tap();
    const index = page.getByRole("dialog", { name: /Index/ });
    await expect(index).toBeVisible();
    await expect(index).toHaveAttribute("data-fallback", "");

    await index.locator('a[href="#work"]').tap();
    await expect(index).toBeHidden();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator("#work")).toBeInViewport();
    await expect
      .poll(() =>
        page.evaluate(
          () => getComputedStyle(document.documentElement).overflow,
        ),
      )
      .not.toBe("hidden");
  });
});
