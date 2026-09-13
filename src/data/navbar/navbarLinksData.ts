import { SECTION_IDS, sectionHref, type SectionId } from '../../constants/sections';

export type NavbarLinkItem = {
  id: Exclude<SectionId, typeof SECTION_IDS.main>;
  label: string;
  href: string;
  ariaLabel: string;
};

export const navbarLinks = {
  cs: [
    {
      id: SECTION_IDS.about,
      label: 'O Mně',
      href: sectionHref(SECTION_IDS.about),
      ariaLabel: 'Přejít na sekci O mně',
    },
    {
      id: SECTION_IDS.projects,
      label: 'Projekty',
      href: sectionHref(SECTION_IDS.projects),
      ariaLabel: 'Přejít na sekci Projekty',
    },
    {
      id: SECTION_IDS.work,
      label: 'Spolupráce',
      href: sectionHref(SECTION_IDS.work),
      ariaLabel: 'Přejít na sekci Spolupráce a způsob práce',
    },
    {
      id: SECTION_IDS.contact,
      label: 'Kontakt',
      href: sectionHref(SECTION_IDS.contact),
      ariaLabel: 'Přejít na sekci Kontakt',
    },
  ],
  en: [
    {
      id: SECTION_IDS.about,
      label: 'About Me',
      href: sectionHref(SECTION_IDS.about),
      ariaLabel: 'Go to the About Me section',
    },
    {
      id: SECTION_IDS.projects,
      label: 'Projects',
      href: sectionHref(SECTION_IDS.projects),
      ariaLabel: 'Go to the Projects section',
    },
    {
      id: SECTION_IDS.work,
      label: 'Collaboration',
      href: sectionHref(SECTION_IDS.work),
      ariaLabel: 'Go to the Collaboration and Work Approach section',
    },
    {
      id: SECTION_IDS.contact,
      label: 'Contact',
      href: sectionHref(SECTION_IDS.contact),
      ariaLabel: 'Go to the Contact section',
    },
  ],
} as const satisfies Record<'cs' | 'en', readonly NavbarLinkItem[]>;
