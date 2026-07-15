import type { Discipline } from "../types";

/** Structural edge kinds — distinct from presentation `relationship` labels in the work map. */
export type CareerEdgeType =
  | "employment_sequence"
  | "agency_to_client"
  | "employment_at"
  | "project_at";

export type CareerNodeKind = "person" | "experience" | "company" | "project";

/** Canonical employment / client node in the career graph. */
export type CareerGraphNode = {
  id: string;
  kind: CareerNodeKind;
  label: string;
  /** Links to experiences.ts for résumé detail. */
  experienceId?: string;
  /** Links to projects.ts for project nodes. */
  projectId?: string;
  /** Shown on the homepage work-map overview tier. */
  showInOverview?: boolean;
  /** Sort key for overview spine (lower = earlier). */
  overviewOrder?: number;
  /** Short label for overview bento / map chrome. */
  overviewLabel?: string;
  /** URL slug for drill-down (`/work?focus=ea`). */
  focusSlug?: string;
  /**
   * Bridge / overlap roles omitted from overview but allowed between consecutive
   * overview milestones on the employment_sequence spine.
   */
  skippableInOverview?: boolean;
  /** Organization strings referenced by timeline-eras.ts `employers` arrays. */
  timelineEmployerAliases?: string[];
};

export type CareerGraphEdge = {
  id: string;
  source: string;
  target: string;
  type: CareerEdgeType;
  connectionNote?: string;
};

export type OverviewEdge = {
  id: string;
  source: string;
  target: string;
  connectionNote?: string;
};

export type CareerValidationIssue = {
  level: "error" | "warn";
  code: string;
  message: string;
};

export type CareerGraphNodeMeta = CareerGraphNode & {
  disciplines?: Discipline[];
};
