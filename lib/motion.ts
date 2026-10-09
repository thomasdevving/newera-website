/** Shared motion tokens. Everything eases out exponentially, like a line being drawn. */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 1.1,
} as const;
