import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Stack, Typography } from '@mui/material';

import { interactiveScale, linkRow } from '../../theme/sharedStyles';
import { RADIUS } from '../../theme/tokens';

const styles = {
  list: { width: { xs: '100%', md: '50%' } },
  anchor: {
    ...linkRow,
    ...interactiveScale,
    textDecoration: 'none',
    transformOrigin: 'left center',
  },
  icon: {
    color: 'inherit',
    bgcolor: 'info.main',
    p: 1,
    borderRadius: RADIUS.circle,
    display: 'inline-flex',
    '&:hover, &:focus-visible': { bgcolor: 'info.main' },
  },
  text: {
    typography: 'body1',
    textDecoration: 'underline',
  },
} as const;

const iconByKey = {
  mail: <MailOutlinedIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  phone: <PhoneOutlinedIcon fontSize="small" />,
} as const;

type ContactItem = {
  key: string;
  icon: keyof typeof iconByKey;
  text: string;
  href: string;
  ariaLabel: string;
};

/** WhatsApp, e-mail and phone links, each with a round icon. */
function ContactList({ items }: { items: readonly ContactItem[] }) {
  return (
    <Stack spacing={2} sx={styles.list}>
      {items.map((item) => (
        <Box
          key={item.key}
          component="a"
          href={item.href}
          aria-label={item.ariaLabel}
          sx={styles.anchor}
          target="_blank"
        >
          <Box sx={styles.icon}>{iconByKey[item.icon]}</Box>
          <Typography sx={styles.text}>{item.text}</Typography>
        </Box>
      ))}
    </Stack>
  );
}

export default ContactList;
