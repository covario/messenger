export const Size = {
  Small: 'small',
} as const;

export type Size = typeof Size[keyof typeof Size];
