import { resumeValueProps } from "@/data/resume-value-props";

const STORAGE_KEY = "ed-norris-resume-value-prop-visit";

/** Returns the next value prop for this visit and advances the persisted visit counter. */
export function getNextResumeValueProp(): (typeof resumeValueProps)[number] {
  const props = resumeValueProps;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const visitIndex = raw ? Number.parseInt(raw, 10) : 0;
    const safeIndex = Number.isFinite(visitIndex) ? visitIndex : 0;
    const index = ((safeIndex % props.length) + props.length) % props.length;
    window.localStorage.setItem(STORAGE_KEY, String(safeIndex + 1));
    return props[index];
  } catch {
    return props[0];
  }
}
