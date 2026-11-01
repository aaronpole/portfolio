import { expect, test, type Page } from "@playwright/test";
import { facts } from "../lib/facts";

const viewports = [
  { width: 1440, height: 900 },
  { width: 768, height: 900 },
  { width: 390, height: 844 },
] as const;

const triggerName = { name: "Random fact", exact: true } as const;

function dialogFor(page: Page) {
  return page.getByRole("dialog", { name: "Random fact" });
}

async function openRandomFact(page: Page) {
  await page.getByRole("button", triggerName).click();
  const dialog = dialogFor(page);
  await expect(dialog).toBeVisible();
  return dialog;
}

async function readFactNumber(page: Page) {
  const text = (
    await dialogFor(page).locator(".fact-number").innerText()
  ).trim();
  const match = /^#(\d{2})$/.exec(text);
  expect(match, `unexpected card number: ${text}`).not.toBeNull();
  return Number(match![1]);
}

async function dismissWithEscape(page: Page) {
  await page.keyboard.press("Escape");
  await expect(dialogFor(page)).toBeHidden();
}

for (const { width, height } of viewports) {
  test.describe(`random fact at ${width}px`, () => {
    test.use({ viewport: { width, height } });

    test("Random Fact replaces Say Hello", async ({ page }) => {
      await page.goto("/");

      const trigger = page.getByRole("button", triggerName);
      await expect(trigger).toBeVisible();
      await expect(trigger).toHaveText("Random fact");

      await expect(
        page.getByRole("link", { name: /say hello/i }),
      ).toHaveCount(0);
    });

    test("Contact navigation still works independently", async ({ page }) => {
      await page.goto("/");

      if (width < 768) {
        await page.getByRole("button", { name: "Index" }).click();
        await page
          .getByRole("dialog", { name: /Index/ })
          .getByRole("link", { name: /Contact/ })
          .click();
      } else {
        await page
          .locator("header")
          .getByRole("link", { name: "Contact", exact: true })
          .click();
      }

      await expect(page).toHaveURL(/#contact$/);
      await expect(page.locator("#contact")).toBeInViewport();
    });

    test("opens from a real touch tap on iPhone WebKit", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "mobile-webkit" || width !== 390);

      await page.goto("/");
      const trigger = page.getByRole("button", triggerName);
      const bounds = await trigger.boundingBox();
      expect(bounds).not.toBeNull();

      await page.touchscreen.tap(
        bounds!.x + bounds!.width / 2,
        bounds!.y + bounds!.height / 2,
      );

      await expect(dialogFor(page)).toBeVisible();
    });

    test("Index opens from a real touch tap on iPhone WebKit", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "mobile-webkit" || width !== 390);

      await page.goto("/");
      const trigger = page.getByRole("button", { name: "Index" });
      const bounds = await trigger.boundingBox();
      expect(bounds).not.toBeNull();

      await page.touchscreen.tap(
        bounds!.x + bounds!.width / 2,
        bounds!.y + bounds!.height / 2,
      );

      await expect(page.getByRole("dialog", { name: /Index/ })).toBeVisible();
    });

    test("opens a centred card over a dimmed backdrop", async ({ page }) => {
      await page.goto("/");
      const dialog = await openRandomFact(page);

      await expect(dialog.locator(".fact-card")).toBeVisible();
      await page.waitForTimeout(300);

      const box = await dialog.boundingBox();
      expect(box).not.toBeNull();

      const centreX = box!.x + box!.width / 2;
      const centreY = box!.y + box!.height / 2;
      expect(Math.abs(centreX - width / 2)).toBeLessThan(3);
      expect(Math.abs(centreY - height / 2)).toBeLessThan(3);

      const backdrop = await page.locator("[data-random-fact-backdrop]").evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          background: style.backgroundColor,
          filter: style.backdropFilter || style.webkitBackdropFilter,
        };
      });
      expect(backdrop.background).not.toBe("rgba(0, 0, 0, 0)");
      expect(backdrop.filter).toContain("blur");
    });

    test("shows only the fact number before it is flipped", async ({
      page,
    }) => {
      await page.goto("/");
      const dialog = await openRandomFact(page);

      const front = dialog.locator('[data-fact-face="front"]');
      const back = dialog.locator('[data-fact-face="back"]');

      await expect(front).toBeVisible();
      await expect(front).toHaveText(/^Random fact\s*#\d{2}$/);
      await expect(back).toBeHidden();

      for (const fact of facts) {
        await expect(dialog.getByText(fact, { exact: true })).toBeHidden();
      }
    });

    test("flipping the card reveals the matching fact", async ({ page }) => {
      await page.goto("/");
      const dialog = await openRandomFact(page);
      const card = dialog.locator(".fact-card");
      const front = dialog.locator('[data-fact-face="front"]');
      const back = dialog.locator('[data-fact-face="back"]');

      const number = await readFactNumber(page);
      const expected = facts[number - 1];

      await card.click();
      await expect(back).toBeVisible();
      await expect(front).toBeHidden();
      await expect(back).toHaveAttribute("data-fact-index", String(number));
      await expect(back.locator("[data-fact-text]")).toHaveText(expected);

      // A second click flips the card back; it must never close the dialog.
      await card.click();
      await expect(front).toBeVisible();
      await expect(dialog).toBeVisible();
    });

    test("different openings can produce different facts", async ({ page }) => {
      await page.goto("/");

      const seen = new Set<number>();
      for (let opening = 0; opening < 6; opening += 1) {
        await openRandomFact(page);
        seen.add(await readFactNumber(page));
        await dismissWithEscape(page);
      }

      expect(seen.size).toBeGreaterThan(1);
    });

    test("consecutive openings never repeat the same fact", async ({
      page,
    }) => {
      await page.goto("/");

      let previous: number | null = null;
      for (let opening = 0; opening < 12; opening += 1) {
        await openRandomFact(page);
        const number = await readFactNumber(page);

        if (previous !== null) {
          expect(number, `opening ${opening + 1}`).not.toBe(previous);
        }

        previous = number;
        await dismissWithEscape(page);
      }
    });

    test("close button, backdrop and Escape all dismiss", async ({ page }) => {
      await page.goto("/");

      let dialog = await openRandomFact(page);
      await dialog
        .getByRole("button", { name: "Close random fact" })
        .click();
      await expect(dialog).toBeHidden();

      dialog = await openRandomFact(page);
      await dismissWithEscape(page);

      dialog = await openRandomFact(page);
      await page.mouse.click(4, 4);
      await expect(dialog).toBeHidden();
    });

    test("locks background scrolling and restores it on close", async ({
      page,
    }) => {
      await page.goto("/");
      await page.evaluate(() => window.scrollTo(0, 800));
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(0);

      const before = await page.evaluate(() => window.scrollY);

      const dialog = await openRandomFact(page);
      await page.waitForTimeout(300);

      const overflowWhileOpen = await page.evaluate(
        () => getComputedStyle(document.body).overflow,
      );
      expect(overflowWhileOpen).toBe("hidden");

      await page.mouse.move(width / 2, height / 2);
      await page.mouse.wheel(0, 900);
      await page.waitForTimeout(250);
      expect(await page.evaluate(() => window.scrollY)).toBe(before);

      await dismissWithEscape(page);
      await expect(dialog).toBeHidden();

      const overflowAfterClose = await page.evaluate(
        () => getComputedStyle(document.body).overflow,
      );
      expect(overflowAfterClose).not.toBe("hidden");
      expect(await page.evaluate(() => window.scrollY)).toBe(before);

      await page.mouse.move(width / 2, height / 2);
      await page.mouse.wheel(0, 900);
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(before);
    });

    test("hides the scrollbar while normal scrolling still works", async ({
      page,
    }) => {
      await page.goto("/");

      const styles = await page.evaluate(() => ({
        scrollbarWidth: getComputedStyle(document.documentElement)
          .scrollbarWidth,
        webkitScrollbar: getComputedStyle(
          document.documentElement,
          "::-webkit-scrollbar",
        ).display,
        scrollbarGap:
          window.innerWidth - document.documentElement.clientWidth,
      }));

      expect(styles.scrollbarWidth).toBe("none");
      expect(styles.webkitScrollbar).toBe("none");
      expect(styles.scrollbarGap).toBe(0);

      await page.mouse.move(width / 2, height / 2);
      await page.mouse.wheel(0, 1400);
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(0);

      const afterWheel = await page.evaluate(() => window.scrollY);
      await page.keyboard.press("End");
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(afterWheel);
    });
  });
}
