import { toPng } from "html-to-image";

const BUSINESS_CARD_FRONT_FILENAME = "edd-norris-business-card.png";
const BUSINESS_CARD_BACK_FILENAME = "edd-norris-business-card-back.png";
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

function triggerDownload(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

async function captureFace(root: HTMLElement, face: "front" | "back"): Promise<string> {
  const element = root.querySelector<HTMLElement>(`[data-business-card-face="${face}"]`);
  if (!element) {
    throw new Error(`Business card ${face} not found`);
  }

  root.dataset.captureFace = face;
  root.classList.add("business-card-flip--capture");

  try {
    return await toPng(element, {
      pixelRatio: EXPORT_PIXEL_RATIO,
      cacheBust: true,
      skipFonts: false,
      filter: (node) => !(node instanceof HTMLElement && node.dataset.captureExclude !== undefined),
    });
  } finally {
    root.classList.remove("business-card-flip--capture");
    delete root.dataset.captureFace;
  }
}

export async function downloadBusinessCard(root: HTMLElement): Promise<void> {
  await waitForImages(root);

  const frontDataUrl = await captureFace(root, "front");
  triggerDownload(frontDataUrl, BUSINESS_CARD_FRONT_FILENAME);

  const back = root.querySelector('[data-business-card-face="back"]');
  if (!back) return;

  const backDataUrl = await captureFace(root, "back");
  triggerDownload(backDataUrl, BUSINESS_CARD_BACK_FILENAME);
}
