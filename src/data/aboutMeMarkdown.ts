import aboutMeMarkdownCs from '../content/about-me.cs.md?raw';
import aboutMeMarkdownEn from '../content/about-me.en.md?raw';

/**
 * The About Me markdown (intro bullets, skills, hobbies…), per language.
 *
 * Kept apart from `aboutMeContent.ts` on purpose: that file is also imported by
 * `scripts/generate-cv.ts` under plain Node, which can't resolve Vite's `?raw` imports.
 */
export const ABOUT_ME_MARKDOWN = {
  cs: aboutMeMarkdownCs,
  en: aboutMeMarkdownEn,
} as const;
