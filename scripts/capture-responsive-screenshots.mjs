import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "screenshots");
const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const viewports = [
  { name: "responsive-390", width: 390, height: 844 },
  { name: "responsive-768", width: 768, height: 1024 },
  { name: "responsive-1440", width: 1440, height: 900 },
  { name: "responsive-1920", width: 1920, height: 1080 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  });
  const page = await context.newPage();
  try {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector("#hero", { timeout: 30000 });
    await page.waitForTimeout(2500);
    await page.screenshot({
      path: path.join(outDir, `${vp.name}.png`),
      fullPage: true,
    });
    console.log(`saved ${vp.name}.png (${vp.width}x${vp.height})`);
  } finally {
    await context.close();
  }
}

await browser.close();
