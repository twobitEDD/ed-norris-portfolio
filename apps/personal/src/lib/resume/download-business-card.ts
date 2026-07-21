import { toPng } from "html-to-image";

const BUSINESS_CARD_FILENAME = "edd-norris-business-card.png";
/** 3.5"×2" at 300 DPI ≈ 1050×600px; card displays ~320px wide → 4× yields ~1280×731px. */
const EXPORT_PIXEL_RATIO = 4;

async function waitForImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }),
    ),
  );
}

export async function downloadBusinessCard(element: HTMLElement): Promise<void> {
  await waitForImages(element);

  const dataUrl = await toPng(element, {
    pixelRatio: EXPORT_PIXEL_RATIO,
    cacheBust: true,
    skipFonts: false,
    filter: (node) => !(node instanceof HTMLElement && node.dataset.captureExclude !== undefined),
  });

  const link = document.createElement("a");
  link.download = BUSINESS_CARD_FILENAME;
  link.href = dataUrl;
  link.click();
}
