import type { CSSProperties } from 'react';

/** Sets the --d delay used by the entrance and reveal animations, e.g. delay('.1s'). */
export const delay = (d: string) => ({ '--d': d }) as CSSProperties;

/** Sets the --i stagger index used by the .stag animation. */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
