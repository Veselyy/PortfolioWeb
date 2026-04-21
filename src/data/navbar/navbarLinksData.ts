export type NavbarLinkItem = {
  id: 'about' | 'projects' | 'work' | 'footer';
  label: string;
  href: string;
  ariaLabel: string;
};

export const navbarLinks: NavbarLinkItem[] = [
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
];
