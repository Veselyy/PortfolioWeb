/**
 * Reusable `sx` fragments — style patterns that repeat across components.
 *
 * Spread them into a component's local `styles` object:
 *
 *   const styles = {
 *     link: { ...interactiveScale, color: 'inherit' },
 *   } as const;
 *
 * Only patterns used in two or more places live here; one-off styles stay in the component.
 */
import type { Theme } from '@mui/material/styles';

import { FOCUS_OUTLINE, FONT_WEIGHT, HOVER_SCALE } from './tokens';

export const bold = { fontWeight: FONT_WEIGHT.bold } as const;

/** Black in light mode, white in dark mode — for borders, dividers and glows that must contrast. */
export function getContrastColor(theme: Theme): string {
  return theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;
}

/** Transition for the hover/focus scale effect; also used by the button overrides in theme.ts. */
export function hoverScaleTransition(theme: Theme): string {
  return theme.transitions.create(['transform', 'outline-offset'], {
    duration: theme.transitions.duration.shorter,
  });
}

/** Grow slightly on hover / keyboard focus and show the focus ring — for links and link rows. */
export const interactiveScale = {
  transition: hoverScaleTransition,
  '&:hover, &:focus-visible': { transform: `scale(${HOVER_SCALE})` },
  '&:focus-visible': FOCUS_OUTLINE,
} as const;

/** Icon + label link row (project / education / contact links). */
export const linkRow = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  color: 'inherit',
  alignSelf: 'flex-start',
  width: 'fit-content',
} as const;

/** Classic disc bullet list with body-sized items, as used on cards. */
export const bulletList = { m: 0, pl: 2.5, listStyleType: 'disc' } as const;
export const bulletItem = { typography: 'body1', mb: 1, '&:last-child': { mb: 0 } } as const;

/** Hidden visually but still read by screen readers. */
export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  p: 0,
  m: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;
