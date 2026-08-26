import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { FOOTER_CONTENT } from '../data/footerContent';
import { useContactForm } from '../hooks/useContactForm';
import { useLanguage } from '../context/useLanguage';

const FORM_TEXT = {
  cs: {
    sent: 'Odesláno.',
    firstName: 'Jméno',
    lastName: 'Příjmení',
    email: 'Email',
    emailError: 'Zadej platný email.',
    message: 'Zpráva',
    messageError: 'Zpráva musí mít aspoň 5 znaků.',
    send: 'Odeslat',
  },
  en: {
    sent: 'Sent.',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    emailError: 'Enter a valid email.',
    message: 'Message',
    messageError: 'Message must be at least 5 characters.',
    send: 'Send',
  },
} as const;

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

type ContactFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  type?: 'text' | 'email';
  multiline?: boolean;
  minRows?: number;
  error?: boolean;
  /** Always rendered (a space when there is no error) so the layout does not jump. */
  helperText?: string;
};

/**
 * The outlined-input half of MUI's `TextField`, assembled by hand.
 *
 * `TextField` statically imports `Select` (and with it Menu/Popover/roving-tab-index, ~57 kB
 * of code this form never runs), so the primitives it would render are composed directly.
 */
function ContactField({
  label,
  name,
  value,
  onChange,
  autoComplete,
  type = 'text',
  multiline = false,
  minRows,
  error = false,
  helperText = ' ',
}: ContactFieldProps) {
  const id = `contact-${name}`;
  const helperId = `${id}-helper`;

  return (
    <FormControl required error={error} variant="outlined" fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        label={label}
        type={type}
        autoComplete={autoComplete}
        multiline={multiline}
        minRows={minRows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={helperId}
      />
      <FormHelperText id={helperId}>{helperText}</FormHelperText>
    </FormControl>
  );
}

const iconByKey = {
  mail: <MailOutlinedIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  phone: <PhoneOutlinedIcon fontSize="small" />,
} as const;

function Footer() {
  const { lang } = useLanguage();
  const content = FOOTER_CONTENT[lang];
  const text = FORM_TEXT[lang];
  const { values, setField, status, errorMsg, validation, canSubmit, submit } =
    useContactForm(lang);
  const emailError = values.email.trim().length > 0 && !validation.email;
  const messageError = values.message.trim().length > 0 && !validation.message;

  return (
    <Stack component="footer" id="footer" spacing={3}>
      <Typography variant="h4" component="h2" align="center" sx={styles.title}>
        {content.title}
      </Typography>

      <Stack sx={styles.content}>
        <Stack spacing={2} sx={styles.contactList}>
          {content.contactItems.map((item) => {
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

        <Stack
          component="form"
          name="contact"
          data-netlify="true"
          sx={styles.form}
          spacing={2}
          onSubmit={submit}
        >
          <Box>
            {status === 'success' && (
              <Alert severity="success" role="status">
                {text.sent}
              </Alert>
            )}
            {status === 'error' && <Alert severity="error">{errorMsg}</Alert>}
          </Box>

          <ContactField
            label={text.firstName}
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(value) => setField('firstName', value)}
          />
          <ContactField
            label={text.lastName}
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(value) => setField('lastName', value)}
          />
          <ContactField
            label={text.email}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(value) => setField('email', value)}
            error={emailError}
            helperText={emailError ? text.emailError : ' '}
          />
          <ContactField
            label={text.message}
            name="message"
            multiline
            minRows={4}
            value={values.message}
            onChange={(value) => setField('message', value)}
            error={messageError}
            helperText={messageError ? text.messageError : ' '}
          />

          <Button
            type="submit"
            startIcon={status === 'sending' ? <CircularProgress size={18} /> : <MailOutlinedIcon />}
            sx={styles.formButton}
            variant={canSubmit ? 'contained' : 'outlined'}
            color="info"
            disabled={!canSubmit}
          >
            {text.send}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Footer;
