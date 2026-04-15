import type { ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';

type SocialIconButtonProps = {
  href: string;
  tooltip: string;
  ariaLabel: string;
  icon: ReactNode;
  disabled?: boolean;
};

export function SocialIconButton({
  href,
  tooltip,
  ariaLabel,
  icon,
  disabled,
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
        size="small"
        disabled={disabled}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
