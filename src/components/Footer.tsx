import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { FOOTER_CONTENT } from '../data/footerContent';
import { useContactForm } from '../hooks/useContactForm';

const styles = {
  title: { fontWeight: 700 },
  content: {
    gap: { xs: 5, md: 2 },
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
  },
} as const;

const iconByKey = {
  mail: <MailOutlinedIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  phone: <PhoneOutlinedIcon fontSize="small" />,
} as const;

function Footer() {
  const { endpoint, values, setField, status, errorMsg, validation, canSubmit, submit } =
    useContactForm();

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

        <Stack component="form" sx={styles.form} spacing={2} onSubmit={submit}>
          {status === 'success' && <Alert severity="success">Odesláno.</Alert>}
          {status === 'error' && (
            <Alert severity="error">{errorMsg || 'Nepodařilo se odeslat.'}</Alert>
          )}

          {!endpoint && (
            <Alert severity="warning">
              Formulář není napojený na odesílání. Nastav `VITE_CONTACT_FORM_ENDPOINT`.
            </Alert>
          )}

          <TextField
            label="Jméno"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(e) => setField('firstName', e.target.value)}
          />
          <TextField
            label="Příjmení"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(e) => setField('lastName', e.target.value)}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            error={values.email.trim().length > 0 && !validation.email}
            helperText={
              values.email.trim().length > 0 && !validation.email ? 'Zadej platný email.' : ' '
            }
          />
          <TextField
            label="Zpráva"
            name="message"
            multiline
            minRows={4}
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            error={values.message.trim().length > 0 && !validation.message}
            helperText={
              values.message.trim().length > 0 && !validation.message
                ? 'Zpráva musí mít aspoň 5 znaků.'
                : ' '
            }
          />

          <Button
            type="submit"
            startIcon={status === 'sending' ? <CircularProgress size={18} /> : <MailOutlinedIcon />}
            sx={styles.formButton}
            variant={canSubmit ? 'contained' : 'outlined'}
            color="info"
            disabled={!canSubmit}
          >
            Odeslat
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Footer;
