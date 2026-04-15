export type NavbarLinkItem = {
  id: 'about' | 'projects' | 'contact';
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
    id: 'contact',
    label: 'Kontakt',
    href: '#contact',
    ariaLabel: 'Přejít na sekci Kontakt',
  },
];
