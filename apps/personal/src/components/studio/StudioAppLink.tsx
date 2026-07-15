"use client";

import type { ReactNode } from "react";
import type { TabletAppId } from "@/data/tablet-apps";
import { navigateToStudioApp, studioAppHref } from "@/lib/studio-app-nav";

type StudioAppLinkProps = {
  appId?: TabletAppId;
  className?: string;
  children: ReactNode;
};

/** Hash link to the studio iPad — scrolls to #game and opens the requested app. */
export function StudioAppLink({ appId, className, children }: StudioAppLinkProps) {
  return (
    <a
      href={studioAppHref(appId)}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigateToStudioApp(appId);
      }}
    >
      {children}
    </a>
  );
}
