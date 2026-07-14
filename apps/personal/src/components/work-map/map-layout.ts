const positions: Record<string, { x: number; y: number }> = {
  // Center
  "person-ed": { x: 0, y: 0 },

  // Through-line theme ring (hub nodes)
  "theme-education": { x: -300, y: -180 },
  "theme-games": { x: 300, y: -180 },
  "theme-software": { x: 0, y: -300 },
  "theme-marketing": { x: -340, y: 60 },
  "theme-product": { x: 340, y: 60 },
  "theme-production": { x: 0, y: 300 },

  // Environment (lower-left arc)
  "practice-environment": { x: -220, y: 220 },

  // Education experiences (upper-left)
  "exp-node-pps": { x: -480, y: -80 },
  "exp-node-innovation": { x: -480, y: 40 },
  "edu-node-full-sail": { x: -560, y: -200 },
  "exp-node-id-tech": { x: -560, y: 120 },

  // Games chronology (upper-right)
  "exp-node-ea": { x: 480, y: -300 },
  "exp-node-seamless": { x: 520, y: -180 },
  "exp-node-rocket": { x: 520, y: -60 },
  "exp-node-2bit": { x: 480, y: 80 },
  "company-2bit": { x: 380, y: 180 },
  "project-planets-core": { x: 560, y: 120 },

  // Software / marketing crossover (right)
  "exp-node-adidas": { x: 200, y: -180 },
  "exp-node-uncorked": { x: 300, y: -60 },
  "exp-node-fresh": { x: 340, y: 20 },
  "exp-node-opus": { x: 300, y: 100 },
  "exp-node-nice-touch": { x: 260, y: 180 },
  "exp-node-trustless": { x: 420, y: 40 },
  "exp-node-ergnomes": { x: 420, y: 140 },
  "client-google": { x: 140, y: 60 },
  "client-dell": { x: 100, y: 140 },
  "client-wash-u": { x: 60, y: 220 },

  // Environmental present (lower-left)
  "exp-node-oibw": { x: -380, y: 280 },
  "exp-node-co2t": { x: -280, y: 380 },
  "company-co2t": { x: -180, y: 480 },

  // Projects (lower-right)
  "project-ergo": { x: 280, y: 280 },
  "project-carbon": { x: 80, y: 420 },
  "project-web": { x: 380, y: 120 },
};

export function getNodePosition(nodeId: string, _index: number) {
  return positions[nodeId] ?? { x: 0, y: 0 };
}
