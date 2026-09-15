/**
 * Design tokens — the raw design values the whole UI is built from.
 *
 * What belongs here: a value that is part of the visual language (brand colours, font,
 * interaction feedback) or that is repeated across components. A layout value used by a
 * single component (e.g. the hero photo taking 25 % of the row) stays in that component's
 * local `styles` object instead, next to the markup it describes.
 *
 * Spacing values written as plain numbers in `sx` (`p: 2`, `gap: 1`) are MUI spacing units
 * (1 unit = 8px); values written as strings (`'10px'`, `'50%'`) are literal CSS.
 *
 * See `sharedStyles.ts` for ready-made `sx` fragments built from these tokens and `theme.ts`
 * for how they feed the MUI theme.
 */
import type { ThemeMode } from '../context/themeModeContext';

/** Colours that differ between light and dark mode; everything else comes from MUI defaults. */
export const PALETTE = {
  light: {
    backgroundDefault: '#f5f7fa',
    backgroundPaper: '#fafbfd',
    /** Fill colour for accent surfaces (icon buttons, education cards, blockquote border). */
    info: '#87CEEB',
    /** Same hue as `info`, tuned as foreground text (e.g. the hero headline's highlighted words). */
    highlight: '#0F6A99',
  },
  dark: {
    backgroundDefault: '#151518',
    backgroundPaper: '#1b1c20',
    info: '#1E4E8C',
    highlight: '#7AB8EA',
  },
} as const satisfies Record<ThemeMode, Record<string, string>>;

/**
 * Font stack. The CSS custom property is defined in `index.css`, which keeps the actual stack
 * in one place for both plain CSS (html/body) and the MUI theme.
 */
export const FONT_FAMILY = 'var(--font-family-base)';

export const FONT_WEIGHT = {
  medium: 500,
  bold: 700,
} as const;

/** Comfortable tap size in px (WCAG 2.5.5 AAA / Apple HIG); AA 2.5.8 itself only requires 24px. */
export const TOUCH_TARGET_SIZE = 44;

export const RADIUS = {
  /** Fully rounded ends, whatever the element's height. */
  pill: 999,
  circle: '50%',
} as const;

/** Keyboard focus ring shared by every interactive element (buttons, links, accordion). */
export const FOCUS_OUTLINE = {
  outline: '1px solid currentColor',
  outlineOffset: 4,
} as const;

/** How much links and buttons grow on hover / keyboard focus. */
export const HOVER_SCALE = 1.1;

/** Page shell (see App.tsx). */
export const LAYOUT = {
  containerWidth: '95%',
  containerMaxWidth: '1200px',
  /** Vertical gap between the big page blocks (navbar, header, sections, footer). */
  sectionGap: { xs: 4, md: 6 },
  dividerWidth: '40%',
} as const;

export const EFFECTS = {
  /** Frosted-glass mobile navbar: background opacity and blur radius. */
  navbarBackgroundAlpha: 0.7,
  navbarBlur: 'blur(5px)',
  /** Glow around the hero portrait. */
  heroShadowBlur: '20px',
  heroShadowAlpha: 0.5,
  /** Track tint of the pill switches, as opacity of the text colour. */
  switchTrackAlpha: 0.15,
} as const;

/** Smooth scrolling done from JS (see useSmoothScrollTo.ts). */
export const SCROLL = {
  durationMs: 500,
  /** Extra wait after the animation before restoring the CSS `scroll-behavior`. */
  restoreDelayMs: 50,
} as const;

/**
 * Geometry of the pill switches in the navbar, in px. `small` is used in the mobile navbar.
 * `labelFontSize` is for the language switcher's text, `iconFontSize` for the theme switcher's icons.
 */
export const PILL_SWITCH_SIZES = {
  medium: { track: 64, height: 32, thumb: 24, labelFontSize: 12, iconFontSize: 16 },
  small: { track: 52, height: 26, thumb: 20, labelFontSize: 10, iconFontSize: 13 },
} as const;

export type PillSwitchSize = keyof typeof PILL_SWITCH_SIZES;
