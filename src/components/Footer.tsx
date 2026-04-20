import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { FOOTER_CONTENT } from '../data/footerContent';

const styles = {
  title: { fontWeight: 700 },
  content: {
    gap: {xs: 5, md: 2},
    flexDirection: { xs: 'column', md: 'row' },
  },
  contactList: { width: { xs: '100%', md: '50%' } },
  contactIcon: {
    color: 'inherit',
    bgcolor: 'info.main',
    p: 1,
    borderRadius: '50%',
    display: 'inline-flex',
    '&:hover, &:focus-visible': { bgcolor: 'info.main' },
  },
  contactRowAnchor: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    color: 'inherit',
    textDecoration: 'none',
    transformOrigin: 'left center',
    alignSelf: 'flex-start',
    transition: (theme: Theme) =>
      theme.transitions.create(['transform', 'outline-offset'], {
        duration: theme.transitions.duration.shorter,
      }),
    '&:hover, &:focus-visible': { transform: 'scale(1.1)' },
    '&:focus-visible': {
      outline: '1px solid currentColor',
      outlineOffset: 4,
    },
  },
  contactText: {
    typography: 'body1',
    textDecoration: 'underline',
  },
  form: { width: { xs: '100%', md: '50%' } },
  formButton: {
    py: 1.25,
    borderRadius: 1,
    bgcolor: (theme: Theme) =>
      theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    color: (theme: Theme) =>
      theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
    '&:hover': {
      bgcolor: (theme: Theme) =>
        theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    },
  },
} as const;

const iconByKey = {
  mail: <MailOutlinedIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  phone: <PhoneOutlinedIcon fontSize="small" />,
} as const;

function Footer() {
  return (
    <Stack id="footer" spacing={3}>
      <Typography variant="h4" align="center" sx={styles.title}>
        {FOOTER_CONTENT.title}
      </Typography>

      <Stack sx={styles.content}>
        <Stack spacing={2} sx={styles.contactList}>
          {FOOTER_CONTENT.contactItems.map((item) => {
            const icon = iconByKey[item.icon];

            return (
              <Box
                key={item.key}
                component="a"
                href={item.href}
                aria-label={item.ariaLabel}
                sx={styles.contactRowAnchor}
                target="_blank"
              >
                <Box sx={styles.contactIcon}>{icon}</Box>
                <Typography sx={styles.contactText}>{item.text}</Typography>
              </Box>
            );
          })}
        </Stack>

        <Stack component="form" sx={styles.form} spacing={2} onSubmit={(e) => e.preventDefault()}>
          <TextField label="Jméno" name="firstName" autoComplete="given-name" />
          <TextField label="Příjmení" name="lastName" autoComplete="family-name" />
          <TextField label="Email" name="email" type="email" autoComplete="email" />
          <TextField label="Zpráva" name="message" multiline minRows={4} />

          <Button type="submit" startIcon={<MailOutlinedIcon />} sx={styles.formButton}>
            Odeslat
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Footer;
