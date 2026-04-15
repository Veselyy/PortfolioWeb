import { Stack } from '@mui/material';

import { SocialIconButton } from './SocialIconButton';
import { socialLinks } from './socialLinks';

function SocialsIcons() {
  return (
    <Stack component="div" direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {socialLinks.map(({ id, href, tooltip, ariaLabel, Icon, disabled }) => (
        <SocialIconButton
          key={id}
          href={href}
          tooltip={tooltip}
          ariaLabel={ariaLabel}
          disabled={disabled}
          icon={<Icon fontSize="small" />}
        />
      ))}
    </Stack>
  );
}

export default SocialsIcons;
