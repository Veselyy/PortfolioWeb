export type NavbarLinkItem = {
  id: 'about' | 'projects' | 'work' | 'footer';
  label: string;
  href: string;
  ariaLabel: string;
};

export const navbarLinks = {
  cs: [
    {
      id: 'about',
      label: 'O Mně',
      href: '#about',
      ariaLabel: 'Přejít na sekci O mně',
    },
    {
      id: 'projects',
      label: 'Projekty',
      href: '#projects',
      ariaLabel: 'Přejít na sekci Projekty',
    },
    {
      id: 'work',
      label: 'Spolupráce',
      href: '#work',
      ariaLabel: 'Přejít na sekci Spolupráce a způsob práce',
    },
    {
      id: 'footer',
      label: 'Kontakt',
      href: '#footer',
      ariaLabel: 'Přejít na sekci Kontakt',
    },
  ],
  en: [
    {
      id: 'about',
      label: 'About Me',
      href: '#about',
      ariaLabel: 'Go to the About Me section',
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '#projects',
      ariaLabel: 'Go to the Projects section',
    },
    {
      id: 'work',
      label: 'Collaboration',
      href: '#work',
      ariaLabel: 'Go to the Collaboration and Work Approach section',
    },
    {
      id: 'footer',
      label: 'Contact',
      href: '#footer',
      ariaLabel: 'Go to the Contact section',
    },
  ],
} as const satisfies Record<'cs' | 'en', readonly NavbarLinkItem[]>;
