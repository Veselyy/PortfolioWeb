import type { ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';

import { EXTERNAL_LINK_PROPS } from '../../constants/links';

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
        {...EXTERNAL_LINK_PROPS}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
