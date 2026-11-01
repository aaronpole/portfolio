import { expect, test } from "@playwright/test";

const viewports = [
  { name: "Desktop", width: 1440, height: 900 },
  { name: "Laptop", width: 1024, height: 900 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "iPhone", width: 390, height: 844 },
  { name: "Small mobile", width: 375, height: 667 },
] as const;

const sectionIds = ["about", "work", "experience", "stack", "contact"] as const;

for (const { name, width, height } of viewports) {
  test.describe(`Cross-device compatibility at ${name} (${width}x${height})`, () => {
    test.use({ viewport: { width, height } });

    test("1 & 2. Every section is visible and no blank sections remain", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(500);

      // Scroll to each section and verify it is visible
      for (const id of sectionIds) {
        const section = page.locator(`#${id}`);
        await expect(section).toBeAttached();
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await expect(section).toBeVisible();
        // Check that [data-reveal] elements in this section are visible (opacity > 0)
        const revealOpacities = await section.locator("[data-reveal]").evaluateAll((els) =>
          els.map((el) => {
            const style = window.getComputedStyle(el);
            return parseFloat(style.opacity);
          }),
        );
        for (const opacity of revealOpacities) {
          expect(opacity).toBeGreaterThan(0.5);
        }
      }
    });

    test("3, 4, 5. Random Fact opens on tap, flips to reveal content, and closes", async ({ page }) => {
      await page.goto("/");
      const rfButton = page.getByRole("button", { name: "Random fact", exact: true });
      await expect(rfButton).toBeVisible();

      // Open on click / tap
      await rfButton.click();
      const dialog = page.getByRole("dialog", { name: "Random fact" });
      await expect(dialog).toBeVisible();

      // Verify card-flip interaction
      const card = dialog.locator(".fact-card");
      const front = dialog.locator('[data-fact-face="front"]');
      const back = dialog.locator('[data-fact-face="back"]');

      await expect(front).toBeVisible();
      await expect(back).toBeHidden();

      await card.click();
      await expect(back).toBeVisible();
      await expect(front).toBeHidden();

      // Close using close button
      const closeBtn = dialog.getByRole("button", { name: "Close random fact" });
      await closeBtn.click();
      await expect(dialog).toBeHidden();
    });

    test("6. Index opens, navigates and closes", async ({ page }) => {
      await page.goto("/");

      if (width < 768) {
        const indexButton = page.getByRole("button", { name: "Index" });
        await expect(indexButton).toBeVisible();
        await indexButton.click();

        const dialog = page.getByRole("dialog", { name: /Index/ });
        await expect(dialog).toBeVisible();

        // Check all links exist
        for (const id of sectionIds) {
          const navLink = dialog.locator(`a[href="#${id}"]`);
          await expect(navLink).toBeVisible();
        }

        // Navigate to contact
        await dialog.locator('a[href="#contact"]').click();
        await expect(dialog).toBeHidden();
        await expect(page).toHaveURL(/#contact$/);
        await expect(page.locator("#contact")).toBeInViewport();
      } else {
        // Desktop nav
        const header = page.locator("header");
        const contactLink = header.getByRole("link", { name: "Contact", exact: true });
        await expect(contactLink).toBeVisible();
        await contactLink.click();
        await expect(page).toHaveURL(/#contact$/);
        await expect(page.locator("#contact")).toBeInViewport();
      }
    });

    test("7. No horizontal overflow", async ({ page }) => {
      await page.goto("/");

      // Scroll incrementally to trigger any layout shifts
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        window.scrollTo(0, 0);
      });

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
    });

    test("8. Navbar elements do not wrap awkwardly or overlap", async ({ page }) => {
      await page.goto("/");

      const headerInfo = await page.evaluate(() => {
        const header = document.querySelector("header");
        const brand = header?.querySelector("a[href='#top']");
        const rfBtn = header?.querySelector(".random-fact-trigger");
        const indexBtn = header?.querySelector("button.tag");

        const getBox = (el: Element | null | undefined) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, height: r.height, left: r.left, right: r.right };
        };

        return {
          headerH: header?.getBoundingClientRect().height ?? 0,
          brand: getBox(brand),
          rfBtn: getBox(rfBtn),
          indexBtn: getBox(indexBtn),
        };
      });

      // Header height should stay at 64px (h-16), not expanded due to wrapping
      expect(headerInfo.headerH).toBeLessThanOrEqual(68);

      // Buttons should not overlap
      if (headerInfo.rfBtn && headerInfo.indexBtn) {
        expect(headerInfo.rfBtn.right).toBeLessThanOrEqual(headerInfo.indexBtn.left + 2);
      }
    });

    test("9. Normal scrolling works smoothly", async ({ page }) => {
      await page.goto("/");
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(200);
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(0);
    });
  });
}

