import type { Language } from '../../context/languageContext';
import { ABOUT_ME_CONTENT } from '../../data/aboutMeContent';

export type EducationCardData = {
  title: string;
  linkLabel: string;
  linkHref: string;
  bullets: readonly string[];
  references?: readonly string[];
};

export type EducationSectionData = {
  title: string;
  cards: readonly EducationCardData[];
};

function hasCards(section: { title: string }): section is EducationSectionData {
  return 'cards' in section;
}

// Identify the section by its shape rather than by a title string duplicated in code:
// renaming the heading in aboutMeContent.ts used to throw here and blank the whole page.
export function getEducationSection(lang: Language): EducationSectionData | undefined {
  return ABOUT_ME_CONTENT[lang].sections.find(hasCards);
}
