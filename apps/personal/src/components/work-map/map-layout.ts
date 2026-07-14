const positions: Record<string, { x: number; y: number }> = {
  "person-ed": { x: 0, y: 0 },
  "practice-environment": { x: -280, y: -120 },
  "practice-games": { x: 280, y: -120 },
  "practice-software": { x: 0, y: -220 },
  "practice-marketing": { x: -320, y: 80 },
  "practice-operations": { x: 320, y: 80 },
  "practice-data": { x: 0, y: 220 },
  "company-2bit": { x: -420, y: -40 },
  "company-co2t": { x: -200, y: 180 },
  "project-ergo": { x: 420, y: -40 },
  "project-carbon": { x: 200, y: 180 },
  "project-web": { x: 380, y: 140 },
  "skill-typescript": { x: -100, y: -300 },
  "skill-nextjs": { x: 100, y: -300 },
  "outcome-traceability": { x: -80, y: 320 },
};

export function getNodePosition(nodeId: string, _index: number) {
  return positions[nodeId] ?? { x: 0, y: 0 };
}
