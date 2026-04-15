import type { ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';

type SocialIconButtonProps = {
  href: string;
  tooltip: string;
  ariaLabel: string;
  icon: ReactNode;
  onClick?: () => void;
};

export function SocialIconButton({
  href,
  tooltip,
  ariaLabel,
  icon,
  onClick,
}: SocialIconButtonProps) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        color="inherit"
        component="a"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        onClick={onClick}
        sx={{
          transition: (theme) =>
            theme.transitions.create('transform', { duration: theme.transitions.duration.shorter }),
          '&:hover': { transform: 'scale(1.1)' },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
