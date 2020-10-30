export const Intent = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export type Intent = typeof Intent[keyof typeof Intent];
