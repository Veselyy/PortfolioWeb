import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Stack, Typography } from '@mui/material';

import { EXTERNAL_LINK_PROPS } from '../../constants/links';
import { interactiveScale, linkRow, visuallyHidden } from '../../theme/sharedStyles';
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
  visuallyHidden,
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
  /** Screen-reader-only suffix describing what the link does, e.g. `(zavolat)`. */
  purpose: string;
  /**
   * Only for links leading to another website. `mailto:`/`tel:` hand off to a local app and
   * have no page to show, so opening them in a new tab just strands an empty one.
   */
  external?: boolean;
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
          sx={styles.anchor}
          {...(item.external ? EXTERNAL_LINK_PROPS : {})}
        >
          <Box sx={styles.icon}>{iconByKey[item.icon]}</Box>
          <Typography sx={styles.text}>{item.text}</Typography>
          <Box component="span" sx={styles.visuallyHidden}>
            {item.purpose}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

export default ContactList;
