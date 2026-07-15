import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "screenshots", "review-2026-07-14");
const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const sections = [
  { id: "hero", name: "hero" },
  { id: "game", name: "apps-phone" },
  { id: "map", name: "map" },
  { id: "timeline", name: "timeline" },
  { id: "resume", name: "resume-notebook" },
  { id: "work", name: "work-slideshow" },
  { id: "contact", name: "contact" },
];

const routes = [
  { path: "/", name: "home" },
  { path: "/map", name: "map-page" },
  { path: "/work", name: "work-page" },
  { path: "/timeline", name: "timeline-page" },
  { path: "/schedule", name: "schedule-page" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

const page = await context.newPage();

for (const route of routes) {
  try {
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(outDir, `${route.name}-full.png`),
      fullPage: true,
    });
    console.log(`saved ${route.name}-full.png`);
  } catch (e) {
    console.log(`route ${route.path} error:`, e.message);
  }
}

await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2000);

for (const section of sections) {
  const el = page.locator(`#${section.id}`);
  if ((await el.count()) === 0) {
    console.log(`skip ${section.name} — #${section.id} not found`);
    continue;
  }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await el.screenshot({ path: path.join(outDir, `section-${section.name}.png`) });
  console.log(`saved section-${section.name}.png`);
}

await browser.close();
console.log(`Screenshots saved to ${outDir}`);
