import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';

import { CONTACT_FORM } from '../../constants/contactForm';
import { useLanguage } from '../../context/useLanguage';
import { CONTACT_FORM_TEXT } from '../../data/contactFormText';
import { useContactForm } from '../../hooks/useContactForm';
import ContactField from './ContactField';

const styles = {
  form: { width: { xs: '100%', md: '50%' } },
  submitButton: {
    py: 1.25,
    borderRadius: 1,
  },
} as const;

/** Netlify contact form: status alert, four fields and the submit button. */
function ContactForm() {
  const { lang } = useLanguage();
  const text = CONTACT_FORM_TEXT[lang];
  const { values, setField, status, errorMsg, validation, canSubmit, submit } =
    useContactForm(lang);
  const emailError = values.email.trim().length > 0 && !validation.email;
  const messageError = values.message.trim().length > 0 && !validation.message;

  return (
    <Stack
      component="form"
      name={CONTACT_FORM.netlifyFormName}
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
        sx={styles.submitButton}
        variant={canSubmit ? 'contained' : 'outlined'}
        color="info"
        disabled={!canSubmit}
      >
        {text.send}
      </Button>
    </Stack>
  );
}

export default ContactForm;
