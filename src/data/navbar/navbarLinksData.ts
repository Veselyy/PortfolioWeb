export type NavbarLinkItem = {
  id: 'about' | 'projects' | 'footer';
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
    id: 'footer',
    label: 'Kontakt',
    href: '#footer',
    ariaLabel: 'Přejít na sekci Kontakt',
  },
];
