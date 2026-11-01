import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("test-results/random-fact", { recursive: true });

const browser = await chromium.launch();

for (const [width, height] of [
  [1440, 900],
  [1024, 900],
  [768, 900],
  [390, 844],
  [360, 740],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(1200);

  const headerInfo = await page.evaluate(() => {
    const header = document.querySelector("header");
    const brand = header?.querySelector("a");
    const trigger = header?.querySelector(".random-fact-trigger");
    const index = header?.querySelector("button.tag");
    const box = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: Math.round(rect.x), w: Math.round(rect.width), h: Math.round(rect.height) };
    };
    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollbarGap: window.innerWidth - document.documentElement.clientWidth,
      brand: box(brand),
      trigger: box(trigger),
      index: box(index),
      header: box(header),
    };
  });

  console.log(width, JSON.stringify(headerInfo));

  await page.screenshot({
    path: `test-results/random-fact/${width}-page.png`,
  });

  await page
    .getByRole("button", { name: "Random fact", exact: true })
    .click();
  await page.waitForTimeout(450);
  await page.screenshot({
    path: `test-results/random-fact/${width}-front.png`,
  });

  const dialogInfo = await page.evaluate(() => {
    const dialog = document.querySelector(".random-fact-dialog");
    const card = document.querySelector(".fact-card");
    const box = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      };
    };
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      dialog: box(dialog),
      card: box(card),
      frontText: document.querySelector(".fact-face-front")?.innerText,
    };
  });
  console.log(width, "dialog", JSON.stringify(dialogInfo));

  await page.locator(".fact-card").click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `test-results/random-fact/${width}-back.png`,
  });

  await page.close();
}

await browser.close();
