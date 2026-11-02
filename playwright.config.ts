import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Headless WebKit paints in software on this host. Keep a little parallelism
  // without starving per-frame actionability checks, matching CI's serial mode
  // more closely than the default core-count fan-out.
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      // Desktop Safari defaults to a Retina (2x) device scale factor. Headless
      // WebKit falls back to software rendering, where painting the long page at
      // 2x makes Playwright's per-frame actionability checks take seconds. Layout
      // and behaviour are identical at 1x, so keep the test raster at 1x.
      use: { ...devices["Desktop Safari"], deviceScaleFactor: 1 },
    },
  ],

  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
