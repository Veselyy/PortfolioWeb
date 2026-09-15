import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button, IconButton, Stack } from '@mui/material';

import { EXTERNAL_LINK_PROPS } from '../../constants/links';
import { SECTION_IDS, sectionHref } from '../../constants/sections';
import { useLanguage } from '../../context/useLanguage';
import { CONTACT } from '../../data/contact';
import { UI_TEXT } from '../../data/uiText';
import { bold } from '../../theme/sharedStyles';
import { TOUCH_TARGET_SIZE } from '../../theme/tokens';

const styles = {
  row: { alignItems: 'center', flexWrap: 'wrap' },
  button: {
    ...bold,
    borderRadius: 1,
    borderColor: 'info.main',
    color: 'inherit',
    boxShadow: 'none',
    px: 2,
    py: 1,
  },
  iconButton: {
    color: 'inherit',
    bgcolor: 'info.main',
    p: 1.5,
    minWidth: TOUCH_TARGET_SIZE,
    minHeight: TOUCH_TARGET_SIZE,
    '&:hover, &:focus-visible': { bgcolor: 'info.main' },
  },
} as const;

/** "Feel free to reach out" button (jumps to the contact section) plus WhatsApp and e-mail shortcuts. */
function HeaderCta({ title }: { title: string }) {
  const { lang } = useLanguage();
  const contactAriaLabels = UI_TEXT[lang].contactAria;

  return (
    <Stack direction="row" spacing={3} sx={styles.row}>
      <Button
        component="a"
        href={sectionHref(SECTION_IDS.contact)}
        variant="outlined"
        color="info"
        sx={styles.button}
      >
        {title}
      </Button>
      <IconButton
        component="a"
        href={CONTACT.whatsapp.href}
        {...EXTERNAL_LINK_PROPS}
        aria-label={contactAriaLabels.whatsapp}
        sx={styles.iconButton}
      >
        <WhatsAppIcon />
      </IconButton>
      <IconButton
        component="a"
        href={CONTACT.email.href}
        aria-label={contactAriaLabels.email}
        sx={styles.iconButton}
      >
        <MailOutlinedIcon />
      </IconButton>
    </Stack>
  );
}

export default HeaderCta;
