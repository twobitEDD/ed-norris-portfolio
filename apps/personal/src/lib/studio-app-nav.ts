import { tabletApps, type TabletAppId } from "@/data/tablet-apps";

export const STUDIO_GAME_SECTION_ID = "game";
export const STUDIO_APP_NAV_EVENT = "studio-app-nav";

export function isValidStudioAppId(app: string | null): app is TabletAppId {
  return Boolean(app && tabletApps.some((a) => a.id === app));
}

export function parseStudioAppFromLocation(): TabletAppId | null {
  if (typeof window === "undefined") return null;

  const fromParams = (params: URLSearchParams) => {
    const app = params.get("app");
    if (isValidStudioAppId(app)) return app;
    return null;
  };

  const fromSearch = fromParams(new URLSearchParams(window.location.search));
  if (fromSearch) return fromSearch;

  const hash = window.location.hash;
  const queryStart = hash.indexOf("?");
  if (queryStart === -1) return null;
  return fromParams(new URLSearchParams(hash.slice(queryStart)));
}

export function studioAppHref(appId?: TabletAppId): string {
  return appId ? `/#game?app=${appId}` : "/#game";
}

export function scrollToStudioApps(behavior: ScrollBehavior = "smooth"): void {
  requestAnimationFrame(() => {
    document.getElementById(STUDIO_GAME_SECTION_ID)?.scrollIntoView({ behavior, block: "start" });
  });
}

export function dispatchStudioAppNav(): void {
  window.dispatchEvent(new CustomEvent(STUDIO_APP_NAV_EVENT));
}

/** Scroll to Applications, set hash, and notify StudioPhoneApps listeners. */
export function navigateToStudioApp(appId?: TabletAppId, options?: { scroll?: boolean }): void {
  const scroll = options?.scroll ?? true;
  if (scroll) scrollToStudioApps();

  const nextHash = appId ? `#game?app=${appId}` : "#game";

  if (window.location.hash === nextHash) {
    dispatchStudioAppNav();
    return;
  }

  window.location.hash = nextHash;
}
