import { expect, test } from "@playwright/test";

const sections = ["about", "work", "experience", "stack", "contact"] as const;

test("renders the hero and every primary section", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Aaron Paul/);

  const hero = page.getByRole("heading", { level: 1 });
  await expect(hero).toContainText("Aaron");
  await expect(hero).toContainText("Paul");

  for (const id of sections) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }

  await expect(
    page.getByRole("heading", { name: "MECSeater" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mafia" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "motherjane" }),
  ).toBeVisible();
});

test("every project exposes a repository link", async ({ page }) => {
  await page.goto("/");

  const repoLinks = page.getByRole("link", {
    name: /View .* on GitHub/,
  });

  await expect(repoLinks).toHaveCount(3);

  for (const name of ["MECSeater", "Mafia", "motherjane"]) {
    const link = page.getByRole("link", {
      name: `View ${name} on GitHub`,
    });
    await expect(link).toHaveAttribute("href", /github\.com\/aaronpole/);
    await expect(link).toHaveAttribute("target", "_blank");
  }
});

test("projects with demos expose recognizable live-site links", async ({
  page,
}) => {
  await page.goto("/");

  const liveLinks = page.getByRole("link", { name: /View .* live site/ });
  await expect(liveLinks).toHaveCount(2);

  await expect(
    page.getByRole("link", { name: "View MECSeater live site" }),
  ).toHaveAttribute("href", "https://mecseater.vercel.app/");
  await expect(
    page.getByRole("link", { name: "View Mafia live site" }),
  ).toHaveAttribute("href", "https://mafia-rho-lac.vercel.app/");
});

test("desktop navigation jumps to a section", async ({ page }) => {
  await page.goto("/");

  const header = page.locator("header");
  await header.getByRole("link", { name: "Work", exact: true }).click();

  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("mobile index dialog opens, navigates and closes", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Index" });
  await expect(trigger).toBeVisible();

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Index/ });
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await trigger.click();
  await dialog.getByRole("link", { name: /Contact/ }).click();

  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
});

test("keyboard users can skip to the main content", async ({ page, browserName }) => {
  await page.goto("/");

  const skip = page.getByRole("link", { name: "Skip to content" });

  if (browserName === "webkit") {
    // WebKit's default keyboard policy only tabs to form controls, so links are
    // not reachable with Tab (Safari exposes this as a preference). Focus the
    // link directly, then verify the keyboard activation path.
    await skip.focus();
  } else {
    await page.keyboard.press("Tab");
  }

  await expect(skip).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("contact exposes icon links without raw handles", async ({ page }) => {
  await page.goto("/");

  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("link", { name: /Aaron Paul on GitHub/ }),
  ).toHaveAttribute("href", "https://www.github.com/aaronpole");
  await expect(
    contact.getByRole("link", { name: /Aaron Paul on LinkedIn/ }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/aaron-paul-762248328/");
  await expect(
    contact.getByRole("link", { name: /Aaron Paul on Instagram/ }),
  ).toHaveAttribute("href", "https://www.instagram.com/bud4pesttt/");
  await expect(
    contact.getByRole("link", { name: /Email Aaron Paul/ }),
  ).toHaveAttribute("href", "mailto:aaron4pole@gmail.com");

  await expect(contact.getByText("aaron4pole@gmail.com")).toHaveCount(0);
  await expect(contact.getByText(/github\.com/)).toHaveCount(0);
});

test("about includes the Vitruvian notebook plate", async ({ page }) => {
  await page.goto("/");

  const about = page.locator("#about");
  await expect(about.getByText(/Leonardo da Vinci/).first()).toBeVisible();
  await expect(
    about.getByAltText(/Leonardo da Vinci's Vitruvian Man/),
  ).toBeVisible();
  await expect(about.getByText(/Public domain/)).toBeVisible();
});

test("stack lists Bash instead of Linux", async ({ page }) => {
  await page.goto("/");

  const stack = page.locator("#stack");
  await expect(stack.getByText("Bash", { exact: true })).toBeVisible();
  await expect(stack.getByText("Linux", { exact: true })).toHaveCount(0);
});

test("mafia schematic labels clear the seat ring", async ({ page }) => {
  for (const width of [768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const collisions = await page.evaluate(() => {
      const article = document.querySelector(
        'article[aria-labelledby="mafia-title"]',
      );
      if (!article) return -1;

      const svg = [...article.querySelectorAll("svg")].find(
        (candidate) => candidate.getClientRects().length > 0,
      );
      if (!svg) return -1;

      const labels = [...svg.querySelectorAll("text")].filter((label) =>
        /ROLE DISTRIBUTION|CLIENT RECEIVES/.test(label.textContent ?? ""),
      );
      const seats = [...svg.querySelectorAll("circle[cx]")].map((seat) =>
        seat.getBoundingClientRect(),
      );

      let overlaps = 0;
      for (const label of labels) {
        const box = label.getBoundingClientRect();
        for (const seat of seats) {
          const clear =
            box.right < seat.left ||
            box.left > seat.right ||
            box.bottom < seat.top ||
            box.top > seat.bottom;
          if (!clear) overlaps += 1;
        }
      }

      return overlaps;
    });

    expect(collisions).toBe(0);
  }
});

for (const width of [360, 768, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo(0, 0);
    });

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
  });
}

for (const width of [360, 390]) {
  test(`mobile schematic text stays legible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const smallestRenderedFont = await page.evaluate(() => {
      const sizes: number[] = [];

      for (const svg of document.querySelectorAll<SVGSVGElement>(
        ".plate-pastel svg",
      )) {
        if (!svg.getClientRects().length) continue;

        const scale =
          svg.getBoundingClientRect().width / (svg.viewBox.baseVal.width || 1);

        for (const label of svg.querySelectorAll("text")) {
          if (!label.getClientRects().length) continue;
          sizes.push(
            parseFloat(getComputedStyle(label).fontSize) * scale,
          );
        }
      }

      return sizes.length ? Math.min(...sizes) : 0;
    });

    // Effective on-screen size, not the untransformed SVG font size.
    expect(smallestRenderedFont).toBeGreaterThanOrEqual(10.3);
  });
}

test("mobile tap targets are at least 44px tall", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");

  const undersized = await page.evaluate(() => {
    return [...document.querySelectorAll("a, button")]
      .filter((element) => element.getClientRects().length > 0)
      .filter((element) => !element.closest(".skip-link"))
      .map((element) => {
        const box = element.getBoundingClientRect();
        return {
          label: (
            element.getAttribute("aria-label") ??
            element.textContent ??
            ""
          )
            .trim()
            .slice(0, 40),
          width: box.width,
          height: box.height,
        };
      })
      .filter(
        (target) =>
          target.width > 0 &&
          target.height > 0 &&
          (target.width < 40 || target.height < 44),
      );
  });

  expect(undersized).toEqual([]);
});

test("reduced motion keeps content visible and stops marquee", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "The bench." }),
  ).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();

  const animation = await page
    .locator(".ticker-track")
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
});
