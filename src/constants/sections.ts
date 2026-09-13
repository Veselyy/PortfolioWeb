/**
 * DOM ids of the page landmarks and sections — the targets of the navbar links, the skip
 * link and the header CTA.
 *
 * `index.css` repeats the section ids in its mobile `scroll-margin-top` rule (plain CSS can't
 * import them), so keep that selector in sync when adding or renaming a section.
 */
export const SECTION_IDS = {
  main: 'main',
  about: 'about',
  projects: 'projects',
  work: 'work',
  contact: 'footer',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** `'about-heading'` etc. — the id of a section's `<h2>`, referenced by `aria-labelledby`. */
export function sectionHeadingId(id: SectionId): `${SectionId}-heading` {
  return `${id}-heading`;
}

/** `'#about'` etc., for `href` attributes. */
export function sectionHref(id: SectionId): `#${SectionId}` {
  return `#${id}`;
}
