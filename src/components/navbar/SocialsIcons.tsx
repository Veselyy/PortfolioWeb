import { Stack } from '@mui/material';

import { SocialIconButton } from './SocialIconButton';
import { socialLinks } from '../../data/navbar/socialLinks';

type SocialsIconsProps = {
  direction?: 'row' | 'column';
  spacing?: number;
  onNavigate?: () => void;
};

function SocialsIcons({ direction = 'row', spacing = 1, onNavigate }: SocialsIconsProps) {
  return (
    <Stack component="div" direction={direction} spacing={spacing}>
      {socialLinks.map(({ id, href, tooltip, ariaLabel, Icon }) => (
        <SocialIconButton
          key={id}
          href={href}
          tooltip={tooltip}
          ariaLabel={ariaLabel}
          icon={<Icon />}
          onClick={onNavigate}
        />
      ))}
    </Stack>
  );
}

export default SocialsIcons;
