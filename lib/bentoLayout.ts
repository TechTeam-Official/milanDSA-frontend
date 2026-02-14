// lib/bentoLayout.ts

export type BentoPattern = {
  columns: number;
  spans: number[];
};

const BENTO_PATTERNS: BentoPattern[] = [
  { columns: 3, spans: [2, 1] },
  { columns: 3, spans: [1, 2] },
  { columns: 3, spans: [1, 1, 1] },
];

// function shuffle<T>(arr: T[]): T[] {
//   return [...arr].sort(() => Math.random() - 0.5);
// }

export function buildBentoRows<T extends string>(keys: T[]) {
  // Deterministic order (no shuffle)
  const items = [...keys];
  const rows: {
    keys: T[];
    pattern: BentoPattern;
  }[] = [];

  let i = 0;
  let pIdx = 0;

  while (i < items.length) {
    // Cycle through patterns deterministically
    const pattern = BENTO_PATTERNS[pIdx % BENTO_PATTERNS.length];
    pIdx++;

    // If remaining items don’t fit pattern, fallback to basic 1x1...
    if (i + pattern.spans.length > items.length) {
      const remaining = items.length - i;

      rows.push({
        keys: items.slice(i),
        pattern: {
          columns: 3,
          spans: new Array(remaining).fill(1),
        },
      });
      break;
    }

    rows.push({
      keys: items.slice(i, i + pattern.spans.length),
      pattern,
    });

    i += pattern.spans.length;
  }

  return rows;
}
