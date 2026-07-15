import { toPng } from "html-to-image";

const BUSINESS_CARD_FILENAME = "edd-norris-business-card.png";

export async function downloadBusinessCard(element: HTMLElement): Promise<void> {
  const dataUrl = await toPng(element, {
    pixelRatio: 3,
    cacheBust: true,
    filter: (node) => !(node instanceof HTMLElement && node.dataset.captureExclude !== undefined),
  });

  const link = document.createElement("a");
  link.download = BUSINESS_CARD_FILENAME;
  link.href = dataUrl;
  link.click();
}
