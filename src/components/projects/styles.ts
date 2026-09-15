import { getContrastColor } from '../../theme/sharedStyles';

/** Outlined card surface shared by the project cards and the "more projects" note. */
export const projectCardSurface = {
  p: 2,
  borderRadius: 1,
  border: '1px solid',
  borderColor: getContrastColor,
} as const;
