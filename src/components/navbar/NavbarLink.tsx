import { Link } from '@mui/material';

type NavbarLinkProps = {
  label: string;
  href: string;
  ariaLabel: string;
  onClick?: () => void;
};

const styles = {
  link: {
    fontWeight: 700,
    fontSize: 16,
    transition: (theme) =>
      theme.transitions.create(['transform', 'outline-offset'], {
        duration: theme.transitions.duration.shorter,
      }),
    '&:hover, &:focus-visible': { transform: 'scale(1.1)' },
    '&:focus-visible': {
      outline: '1px solid currentColor',
      outlineOffset: 4,
    },
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
