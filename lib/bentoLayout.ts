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

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function buildBentoRows<T extends string>(keys: T[]) {
  const shuffled = shuffle(keys);
  const rows: {
    keys: T[];
    pattern: BentoPattern;
  }[] = [];

  let i = 0;

  while (i < shuffled.length) {
    const pattern =
      BENTO_PATTERNS[Math.floor(Math.random() * BENTO_PATTERNS.length)];

    // If remaining items don’t fit pattern, fallback gracefully
    if (i + pattern.spans.length > shuffled.length) {
      const remaining = shuffled.length - i;

      rows.push({
        keys: shuffled.slice(i),
        pattern: {
          columns: 3,
          spans: new Array(remaining).fill(1),
        },
      });
      break;
    }

    rows.push({
      keys: shuffled.slice(i, i + pattern.spans.length),
      pattern,
    });

    i += pattern.spans.length;
  }

  return rows;
}
