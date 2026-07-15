import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.LAYOUT_URL || "http://localhost:3000";
const OUT = path.resolve("screenshots/layout-polish-2026-07-15");

const sections = [
  { name: "01-hero-desktop", viewport: { width: 1440, height: 900 }, scroll: 0 },
  { name: "02-hero-to-game-desktop", viewport: { width: 1440, height: 900 }, scroll: 700 },
  { name: "03-game-desktop", viewport: { width: 1440, height: 900 }, hash: "#game" },
  { name: "04-map-desktop", viewport: { width: 1440, height: 900 }, hash: "#map" },
  { name: "05-timeline-desktop", viewport: { width: 1440, height: 900 }, hash: "#timeline" },
  { name: "06-resume-desktop", viewport: { width: 1440, height: 900 }, hash: "#resume" },
  { name: "07-work-desktop", viewport: { width: 1440, height: 900 }, hash: "#work" },
  { name: "08-contact-desktop", viewport: { width: 1440, height: 900 }, hash: "#contact" },
  { name: "09-hero-mobile", viewport: { width: 390, height: 844 }, scroll: 0 },
  { name: "10-hero-to-game-mobile", viewport: { width: 390, height: 844 }, scroll: 600 },
  { name: "11-game-mobile", viewport: { width: 390, height: 844 }, hash: "#game" },
  { name: "12-contact-mobile", viewport: { width: 390, height: 844 }, hash: "#contact" },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2 });

for (const shot of sections) {
  const page = await context.newPage();
  await page.setViewportSize(shot.viewport);
  const url = shot.hash ? `${BASE}${shot.hash}` : BASE;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  if (shot.scroll) await page.evaluate((y) => window.scrollTo(0, y), shot.scroll);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, `${shot.name}.png`), fullPage: false });
  await page.close();
}

await browser.close();
console.log(`Saved ${sections.length} screenshots to ${OUT}`);
