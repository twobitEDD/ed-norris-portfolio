import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(ROOT, '../apps/personal/public');

const files = [
  'northstar-day.jpg',
  'northstar-night.jpg',
  'window-day.jpg',
  'window-night.jpg',
  'hero-vision-desktop.jpg',
  'hero-vision-mobile.jpg',
  'assets/practice-environment-bg.jpg',
  'assets/practice-creative-bg.jpg',
  'assets/desk-wood-surface.jpg',
  'assets/window-band-day.jpg',
  'assets/window-band-night.jpg',
];

async function compressOne(rel) {
  const abs = path.join(PUBLIC, rel);
  if (!fs.existsSync(abs)) {
    return { file: rel, skip: 'missing' };
  }
  const before = fs.statSync(abs).size;
  const dir = path.dirname(abs);
  const base = path.basename(rel, '.jpg');
  const backup = path.join(dir, `${base}-original.jpg`);

  if (!fs.existsSync(backup)) {
    fs.copyFileSync(abs, backup);
  }

  const webpPath = path.join(dir, `${base}.webp`);
  const tmpJpg = path.join(dir, `${base}.compressed-tmp.jpg`);

  const isNorthstar = rel.includes('northstar');
  let webpQuality = 80;
  let jpegQuality = 82;

  const input = sharp(backup).rotate().resize({ width: 1920, withoutEnlargement: true });

  async function writeOutputs(qWebp, qJpeg) {
    await input.clone().webp({ quality: qWebp, effort: 6 }).toFile(webpPath);
    await input.clone().jpeg({ quality: qJpeg, mozjpeg: true }).toFile(tmpJpg);
  }

  await writeOutputs(webpQuality, jpegQuality);

  if (isNorthstar) {
    let webpSize = fs.statSync(webpPath).size;
    while (webpSize > 200 * 1024 && webpQuality > 55) {
      webpQuality -= 5;
      jpegQuality = Math.max(60, jpegQuality - 3);
      await writeOutputs(webpQuality, jpegQuality);
      webpSize = fs.statSync(webpPath).size;
    }
  }

  fs.renameSync(tmpJpg, abs);
  const afterJpg = fs.statSync(abs).size;
  const afterWebp = fs.statSync(webpPath).size;

  return {
    file: rel,
    beforeKB: Math.round(before / 1024),
    afterJpgKB: Math.round(afterJpg / 1024),
    afterWebpKB: Math.round(afterWebp / 1024),
    webpQuality,
    jpegQuality,
  };
}

for (const f of files) {
  try {
    const r = await compressOne(f);
    console.log(JSON.stringify(r));
  } catch (e) {
    console.log(JSON.stringify({ file: f, error: String(e) }));
  }
}
