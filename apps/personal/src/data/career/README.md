# Career data — single source of truth

The work map, timeline, and résumé all pull from the same employment graph. **Do not** hand-edit overview node lists in `map-tiers.ts` — they are derived automatically.

## Files

| File | Role |
|------|------|
| `experiences.ts` | Résumé narrative (title, summary, details, skills) |
| `career/career-graph.ts` | **Canonical** employment nodes, spine edges, overview flags |
| `career/derive.ts` | Builds overview nodes/edges from the graph |
| `career/validate.ts` | Cross-checks graph ↔ experiences ↔ relationships ↔ timeline |
| `relationships.ts` | Full detail-tier graph (themes, projects, presentation copy) |
| `map-tiers.ts` | Thin re-export of derived overview (do not duplicate lists) |
| `timeline-eras.ts` | Narrative era copy; employers must match graph aliases |

## How to add a new job

1. **Add résumé detail** in `experiences.ts` (id, organization, period, summary, etc.).

2. **Register the graph node** in `career/career-graph.ts`:
   ```ts
   {
     id: "exp-node-my-role",
     kind: "experience",
     label: "Acme Corp",
     experienceId: "exp-my-role",
     showInOverview: false,        // true for homepage map milestones
     overviewOrder: 75,            // required when showInOverview: true
     overviewLabel: "Acme",        // short map label
     focusSlug: "acme",            // optional /work?focus=acme
     timelineEmployerAliases: ["Acme Corp"],
   }
   ```

3. **Wire the employment spine** — add `employment_sequence` (or `employment_at` / `agency_to_client`) edges connecting this node to its predecessor and successor in `careerGraphEdges`.

4. **Add the detail-tier node** in `relationships.ts` (presentation: subtitle, description, disciplines, images). Use the **same** `id` and `experienceId` as career-graph.

5. **Add a `led-to` edge** in `relationships.ts` matching the spine edge from step 3.

6. **If the role appears in a timeline era**, add the organization string to `timelineEmployerAliases` on the graph node (must match `timeline-eras.ts` `employers` exactly).

7. **Run validation**:
   ```bash
   npm run validate
   ```

Validation fails if overview edges skip non-skippable employers (e.g. EA → 2bit) or connect clients without an agency node (e.g. adidas → Google).

## Skippable bridge roles

Short freelance / overlap periods use `skippableInOverview: true` so the overview map can simplify without breaking chronology validation. Example: `exp-node-2bit-pause`.

## Edge types

- `employment_sequence` — chronological employer transitions
- `employment_at` — parallel contract / overlap (not on overview spine)
- `agency_to_client` — client work through an agency (Google via Uncorked, etc.)
- `project_at` — project milestone after an employer node
