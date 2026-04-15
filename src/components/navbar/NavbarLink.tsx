import { Link } from '@mui/material';

type NavbarLinkProps = {
  label: string;
  href: string;
  ariaLabel: string;
};

export function NavbarLink({ label, href, ariaLabel }: NavbarLinkProps) {
  return (
    <Link
      color="inherit"
      underline="none"
      href={href}
      aria-label={ariaLabel}
      sx={{
        fontWeight: 700,
        fontSize: 16,
        transform: 'translateZ(0)',
        transition: (theme) =>
          theme.transitions.create('transform', { duration: theme.transitions.duration.shorter }),
        '&:hover': { transform: 'scale(1.1)' },
      }}
    >
      {label}
    </Link>
  );
}
