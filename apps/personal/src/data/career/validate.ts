import { careerData } from "@ed-norris/career-data";
import { experiences } from "../experiences";
import { graphEdges, graphNodes } from "../relationships";
import { timelineEras } from "../timeline-eras";
import {
  careerGraphEdges,
  careerGraphNodes,
  PERSON_NODE_ID,
} from "./career-graph";
import {
  deriveOverviewEdges,
  findSpinePath,
  getOverviewNodeIds,
  getTimelineEmployerIndex,
} from "./derive";
import type { CareerGraphEdge, CareerValidationIssue } from "./types";

const nodeById = new Map(careerGraphNodes.map((n) => [n.id, n]));
const experienceNodeIds = new Set(
  careerGraphNodes.filter((n) => n.experienceId).map((n) => n.id),
);

function spineEdgeTypes(): Set<CareerGraphEdge["type"]> {
  return new Set(["employment_sequence", "employment_at", "agency_to_client", "project_at"]);
}

/** Validate experiences.ts ↔ career-graph node registry. */
export function validateExperienceCoverage(): CareerValidationIssue[] {
  const issues: CareerValidationIssue[] = [];
  const graphExperienceIds = new Set(
    careerGraphNodes.map((n) => n.experienceId).filter(Boolean) as string[],
  );

  for (const exp of experiences) {
    if (!graphExperienceIds.has(exp.id)) {
      issues.push({
        level: "warn",
        code: "experience-no-graph-node",
        message: `experiences.ts "${exp.id}" (${exp.organization}) has no career-graph node — add a row in career-graph.ts`,
      });
    }
  }

  for (const node of careerGraphNodes) {
    if (!node.experienceId) continue;
    const exp = experiences.find((e) => e.id === node.experienceId);
    if (!exp) {
      issues.push({
        level: "error",
        code: "graph-node-missing-experience",
        message: `career-graph node "${node.id}" references missing experience "${node.experienceId}"`,
      });
    }
  }

  return issues;
}

/** Every experience-linked graph node in relationships.ts must exist in career-graph. */
export function validateRelationshipsSync(): CareerValidationIssue[] {
  const issues: CareerValidationIssue[] = [];
  const canonicalIds = new Set(careerGraphNodes.map((n) => n.id));

  for (const node of graphNodes) {
    if (node.type !== "experience" && node.type !== "company") continue;
    if (!node.experienceId && node.type === "experience") continue;
    if (!canonicalIds.has(node.id) && experienceNodeIds.has(node.id)) {
      issues.push({
        level: "error",
        code: "relationships-orphan-node",
        message: `relationships.ts node "${node.id}" is not registered in career-graph.ts`,
      });
    }
    if (node.experienceId) {
      const canonical = careerGraphNodes.find((n) => n.id === node.id);
      if (canonical && canonical.experienceId !== node.experienceId) {
        issues.push({
          level: "error",
          code: "experience-id-mismatch",
          message: `relationships.ts "${node.id}" experienceId "${node.experienceId}" ≠ career-graph "${canonical.experienceId}"`,
        });
      }
    }
  }

  for (const edge of careerGraphEdges) {
    if (edge.type !== "employment_sequence") continue;
    const relEdge = graphEdges.find(
      (e) =>
        e.source === edge.source &&
        e.target === edge.target &&
        (e.relationship === "led-to" ||
          (e.relationship === "built-with" && edge.connectionNote?.includes("parallel"))),
    );
    if (!relEdge) {
      issues.push({
        level: "warn",
        code: "spine-edge-missing-in-relationships",
        message: `employment_sequence ${edge.source} → ${edge.target} missing as led-to edge in relationships.ts`,
      });
    }
  }

  return issues;
}

/** Overview spine must not skip non-skippable employers or use forbidden shortcuts. */
export function validateOverviewSpine(): CareerValidationIssue[] {
  const issues: CareerValidationIssue[] = [];
  const overviewIds = getOverviewNodeIds();
  const derived = deriveOverviewEdges();

  for (let i = 0; i < overviewIds.length - 1; i++) {
    const source = overviewIds[i]!;
    const target = overviewIds[i + 1]!;
    const path = findSpinePath(source, target);

    if (!path) {
      issues.push({
        level: "error",
        code: "overview-no-spine-path",
        message: `Overview milestones ${source} → ${target} have no path on the employment spine`,
      });
      continue;
    }

    const intermediates = path.slice(1, -1);
    const skippedEmployers = intermediates.filter(
      (id) => !nodeById.get(id)?.skippableInOverview,
    );
    if (skippedEmployers.length > 0) {
      const labels = skippedEmployers.map((id) => nodeById.get(id)?.label ?? id);
      issues.push({
        level: "error",
        code: "overview-skips-employer",
        message: `Overview edge ${source} → ${target} skips non-skippable nodes: ${labels.join(", ")}`,
      });
    }
  }

  // Forbidden: direct adidas → Google without agency path
  const adidasToGoogle = derived.find(
    (e) => e.source === "exp-node-adidas" && e.target === "client-google",
  );
  if (adidasToGoogle) {
    issues.push({
      level: "error",
      code: "forbidden-adidas-google-direct",
      message:
        "Forbidden overview edge adidas → Google — must route through exp-node-2bit and exp-node-uncorked (agency_to_client)",
    });
  }

  // Forbidden: EA → 2bit without games foundation chain
  const eaTo2bit = derived.find(
    (e) => e.source === "exp-node-ea" && e.target === "exp-node-2bit",
  );
  if (eaTo2bit) {
    issues.push({
      level: "error",
      code: "forbidden-ea-2bit-direct",
      message:
        "Forbidden overview edge EA → 2bit — must include Black Lantern, Seamless, and Rocket on the spine",
    });
  }

  for (const edge of derived) {
    const canonical = careerGraphEdges.find(
      (e) =>
        e.source === edge.source &&
        e.target === edge.target &&
        spineEdgeTypes().has(e.type),
    );
    if (
      canonical?.type === "agency_to_client" &&
      edge.source.startsWith("exp-node-") &&
      edge.target.startsWith("client-")
    ) {
      const agencyParent = careerGraphEdges.find(
        (e) => e.target === edge.target && e.type === "agency_to_client",
      );
      if (agencyParent && agencyParent.source !== edge.source) {
        issues.push({
          level: "error",
          code: "forbidden-direct-client-edge",
          message: `Forbidden direct edge ${edge.source} → ${edge.target} — client edges must go through agency node ${agencyParent.source}`,
        });
      }
    }
  }

  return issues;
}

/** timeline-eras employers should map to career-graph nodes. */
export function validateTimelineEras(): CareerValidationIssue[] {
  const issues: CareerValidationIssue[] = [];
  const employerIndex = getTimelineEmployerIndex();

  for (const era of timelineEras) {
    for (const employer of era.employers) {
      const normalized = employer.toLowerCase().trim();
      if (normalized === "independent consulting") continue;
      if (!employerIndex.has(normalized)) {
        issues.push({
          level: "warn",
          code: "timeline-unknown-employer",
          message: `timeline-eras "${era.id}" employer "${employer}" has no career-graph alias — add timelineEmployerAliases`,
        });
      }
    }
  }

  return issues;
}

/** career-data.json entry organizations should align with graph labels. */
export function validateCareerDataJson(): CareerValidationIssue[] {
  const issues: CareerValidationIssue[] = [];
  const graphLabels = new Set(
    careerGraphNodes.map((n) => n.label.toLowerCase()),
  );

  for (const entry of careerData.entries) {
    if (entry.type !== "role" && entry.type !== "company") continue;
    const org = (entry.organization ?? entry.title).toLowerCase();
    const title = entry.title.toLowerCase();
    const known =
      graphLabels.has(org) ||
      graphLabels.has(title) ||
      careerGraphNodes.some((n) =>
        n.timelineEmployerAliases?.some(
          (a) => a.toLowerCase() === org || a.toLowerCase() === title,
        ),
      );
    if (!known && entry.featured) {
      issues.push({
        level: "warn",
        code: "career-data-unmapped-entry",
        message: `career-data.json featured entry "${entry.id}" (${entry.title}) not mapped in career-graph`,
      });
    }
  }

  return issues;
}

export function validateCareerData(): CareerValidationIssue[] {
  return [
    ...validateExperienceCoverage(),
    ...validateRelationshipsSync(),
    ...validateOverviewSpine(),
    ...validateTimelineEras(),
    ...validateCareerDataJson(),
  ];
}

export type ValidateCareerDataResult = {
  ok: boolean;
  errors: CareerValidationIssue[];
  warnings: CareerValidationIssue[];
};

export function runCareerValidation(): ValidateCareerDataResult {
  const all = validateCareerData();
  const errors = all.filter((i) => i.level === "error");
  const warnings = all.filter((i) => i.level === "warn");
  return { ok: errors.length === 0, errors, warnings };
}

/** Format issues for CLI output (used by validate script). */
export function formatValidationReport(result: ValidateCareerDataResult): string {
  const lines: string[] = [];
  if (result.ok && result.warnings.length === 0) {
    return "✓ Career data validation passed";
  }
  for (const issue of result.errors) {
    lines.push(`ERROR [${issue.code}]: ${issue.message}`);
  }
  for (const issue of result.warnings) {
    lines.push(`WARN  [${issue.code}]: ${issue.message}`);
  }
  lines.push("");
  lines.push(
    result.ok
      ? `✓ Passed with ${result.warnings.length} warning(s)`
      : `✗ Failed with ${result.errors.length} error(s), ${result.warnings.length} warning(s)`,
  );
  return lines.join("\n");
}

export { PERSON_NODE_ID };
