/**
 * The MUI theme, built from the design tokens in `tokens.ts`.
 *
 * ThemeModeProvider only owns the light/dark state and calls `createAppTheme(mode)`; every
 * visual decision about the theme lives here.
 */
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import type { ThemeMode } from '../context/themeModeContext';
import { hoverScaleTransition } from './sharedStyles';
import { FOCUS_OUTLINE, FONT_FAMILY, HOVER_SCALE, PALETTE } from './tokens';

declare module '@mui/material/styles' {
  interface Palette {
    highlight: { main: string };
  }
  interface PaletteOptions {
    highlight: { main: string };
  }
}

/** Hover/focus feedback shared by MuiButton and MuiIconButton. */
const interactiveButtonStates = {
  '&:focus-visible': FOCUS_OUTLINE,
  '&.Mui-disabled': {
    transform: 'none',
    outline: 'none',
  },
} as const;

export function createAppTheme(mode: ThemeMode) {
  const colors = PALETTE[mode];

  return responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        background: {
          default: colors.backgroundDefault,
          paper: colors.backgroundPaper,
        },
        info: { main: colors.info },
        // Same hue as info.main, tuned as foreground text (e.g. the hero headline's
        // highlighted word) rather than a fill — see Header.tsx.
        highlight: { main: colors.highlight },
      },
      typography: {
        fontFamily: FONT_FAMILY,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: ({ theme }) => ({
              transition: hoverScaleTransition(theme),
              '&:hover, &:focus-visible': { boxShadow: 'none', transform: `scale(${HOVER_SCALE})` },
              ...interactiveButtonStates,
            }),
          },
        },
        MuiIconButton: {
          defaultProps: { size: 'small' },
          styleOverrides: {
            root: ({ theme }) => ({
              transition: hoverScaleTransition(theme),
              '&:hover, &:focus-visible': { transform: `scale(${HOVER_SCALE})` },
              ...interactiveButtonStates,
            }),
          },
        },
        MuiSvgIcon: {
          defaultProps: { fontSize: 'small' },
        },
      },
    }),
  );
}
