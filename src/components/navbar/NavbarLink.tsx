import { Link } from '@mui/material';

import { bold, interactiveScale } from '../../theme/sharedStyles';

type NavbarLinkProps = {
  label: string;
  href: string;
  ariaLabel: string;
  onClick?: () => void;
};

const styles = {
  link: {
    ...bold,
    fontSize: 16,
    ...interactiveScale,
  },
} as const;

export function NavbarLink({ label, href, ariaLabel, onClick }: NavbarLinkProps) {
  return (
    <Link
      color="inherit"
      underline="none"
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      sx={styles.link}
    >
      {label}
    </Link>
  );
}
