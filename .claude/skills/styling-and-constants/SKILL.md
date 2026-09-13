---
name: styling-and-constants
description: Use when adding or changing styles, colours, sizes, spacing, hover/focus effects, section ids, localStorage keys, env flags, form rules or user-facing strings in PortfolioWeb components — anywhere a hardcoded value or inline sx/CSS might be written.
---

# Styling and constants in PortfolioWeb

## Overview

Components don't hold magic values and don't hold content: no text, labels, aria strings or
`.md?raw` imports inside `src/components/` — they read everything from `src/data/` by `lang`. Every shared or meaningful value has one home; the
component's local `styles` object only composes them plus its own one-off layout.

## Where does the value go?

| Value                                                                                                                               | File                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Colour, font weight, radius, touch target, focus ring, hover scale, blur/alpha, switch sizes, scroll timing, page shell widths      | `src/theme/tokens.ts`                                                                                    |
| A repeated `sx` pattern (bold title, link row, hover scale + focus ring, bullet list, visually hidden, black/white contrast colour) | `src/theme/sharedStyles.ts`                                                                              |
| MUI palette / typography / component overrides                                                                                      | `src/theme/theme.ts` (`createAppTheme`)                                                                  |
| Font stack, mobile navbar offset, anything that must be plain CSS                                                                   | `src/index.css` (CSS variables in `:root`)                                                               |
| Section / landmark ids, `#hrefs`, heading ids for `aria-labelledby`                                                                 | `src/constants/sections.ts` (`SECTION_IDS`, `sectionHref`)                                               |
| localStorage keys, default language / theme                                                                                         | `src/constants/preferences.ts`                                                                           |
| `.env` flags (`IS_OPEN_TO_WORK`)                                                                                                    | `src/constants/env.ts`                                                                                   |
| Contact form name, submit URL, validation rules                                                                                     | `src/constants/contactForm.ts`                                                                           |
| `target="_blank"` + `rel`                                                                                                           | `src/constants/links.ts` (`EXTERNAL_LINK_PROPS`)                                                         |
| Header `?role=` query param name and default role                                                                                   | `src/constants/headerRole.ts`                                                                            |
| Section copy (cs/en)                                                                                                                | `src/data/*Content.ts`, `src/content/*.md`                                                               |
| Markdown content (`?raw` imports)                                                                                                   | `src/data/*Markdown.ts` / `workApproachContent.ts` (not `aboutMeContent.ts`: CV script loads it in Node) |
| Language switch codes `CS` / `EN`                                                                                                   | `src/data/languageSwitcherText.ts`                                                                       |
| Small UI strings: aria labels, skip link, nav, quote marks                                                                          | `src/data/uiText.ts` (`UI_TEXT[lang]`)                                                                   |
| Form strings                                                                                                                        | `src/data/contactFormText.ts`                                                                            |

**Stays local in the component:** a layout value used by that component only (e.g. `width: { md: '25%' }`),
kept in its `const styles = { ... } as const` at the top of the file.

## Pattern

```tsx
import { bold, interactiveScale, linkRow } from '../theme/sharedStyles';
import { TOUCH_TARGET_SIZE } from '../theme/tokens';

const styles = {
  title: bold,
  link: { ...linkRow, ...interactiveScale, minHeight: TOUCH_TARGET_SIZE, textDecoration: 'none' },
} as const;
```

Numbers in `sx` spacing props are MUI units (1 = 8px); strings are literal CSS.

## Common mistakes

- Writing `fontWeight: 700`, `'50%'` radius, `outline: '1px solid currentColor'` or
  `scale(1.1)` inline instead of `bold`, `RADIUS.circle`, `FOCUS_OUTLINE`, `interactiveScale`.
- `import.meta.env.VITE_IS_OPEN_TO_WORK === 'true'` in a component — use `IS_OPEN_TO_WORK`.
  (vite.config.ts and Playwright specs keep reading the env var directly; they can't use it.)
- A `const LABELS = { cs, en }`, JSX text like `EN`, or an `import x from '../content/*.md?raw'`
  inside a component — move it to `src/data/`.
- Hardcoded `id="about-heading"` — use `sectionHeadingId(SECTION_IDS.about)`.
- Renaming a section id without updating the selector list in `src/index.css`.
- Changing the Netlify form name without updating the shadow `<form>` in `index.html`.
- Adding an import to `aboutMeContent.ts`, `contact.ts` or `projectsContent.ts` without a `.ts`
  extension — `scripts/generate-cv.ts` loads them with Node's strip-types, which needs it.

## Verify

`pnpm exec tsc -b && pnpm lint && pnpm test` (Playwright includes axe contrast checks).
