import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { alpha, type Theme } from '@mui/material/styles';

import { CONTACT } from '../data/contact';
import { HEADER_CONTENT, HEADER_CTA } from '../data/headerContent';
import { useHeaderRoleFromQuery } from '../hooks/useHeaderRoleFromQuery';
import { useLanguage } from '../context/useLanguage';

const CONTACT_ARIA_LABELS = {
  cs: { whatsapp: 'Kontaktovat přes WhatsApp', email: 'Napsat e-mail' },
  en: { whatsapp: 'Contact via WhatsApp', email: 'Send an email' },
} as const;

const styles = {
  headerWrapper: {
    alignItems: 'center',
    gap: 5,
  },
  headerContent: {
    width: { md: '70%', xs: '100%' },
  },
  ctaButton: {
    fontWeight: 700,
    borderRadius: 1,
    borderColor: 'info.main',
    color: 'inherit',
    boxShadow: 'none',
    px: 2,
    py: 1,
  },
  contactIconButton: {
    color: 'inherit',
    bgcolor: 'info.main',
    p: 1.5,
    minWidth: 44,
    minHeight: 44,
    '&:hover, &:focus-visible': { bgcolor: 'info.main' },
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    bgcolor: 'success.main',
    flex: '0 0 auto',
  },
  availabilityCard: {
    border: '1px solid',
    borderColor: 'success.main',
    bgcolor: 'action.hover',
    borderRadius: 1,
    px: 2,
    py: 1.5,
    alignItems: 'center',
    maxWidth: 760,
  },
  heroWrapper: {
    width: { md: '30%', xs: '100%' },
    p: { md: 0, xs: '0 20%' },
  },
  heroImage: {
    width: '100%',
    borderRadius: '50%',
    boxShadow: (theme: Theme) => {
      const c =
        theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;

      return `0 0 20px ${alpha(c, 0.5)}`;
    },
  },
} as const;

function Header() {
  const { lang } = useLanguage();
  const role = useHeaderRoleFromQuery();
  const intro = HEADER_CONTENT[lang][role];
  const cta = HEADER_CTA[lang];
  const contactAriaLabels = CONTACT_ARIA_LABELS[lang];

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} sx={styles.headerWrapper}>
      <Stack spacing={3} sx={styles.headerContent}>
        <Typography variant="h1" sx={{ fontWeight: '700' }}>
          {intro.title.parts.map((p, idx) => (
            <Box key={idx} component="span" sx={p.highlight ? { color: 'info.main' } : undefined}>
              {p.text}
            </Box>
          ))}
        </Typography>
        <Typography variant="h4">{intro.subtitle}</Typography>

        <Stack direction="row" spacing={2} sx={styles.availabilityCard}>
          <Box sx={styles.availabilityDot} />
          <Typography variant="body1">
            <strong>{intro.availability.strong}</strong>
            {intro.availability.normal}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            component="a"
            href="#footer"
            variant="outlined"
            color="info"
            sx={styles.ctaButton}
          >
            {cta.title}
          </Button>
          <IconButton
            component="a"
            href={CONTACT.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            aria-label={contactAriaLabels.whatsapp}
            sx={styles.contactIconButton}
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            component="a"
            href={CONTACT.email.href}
            aria-label={contactAriaLabels.email}
            sx={styles.contactIconButton}
          >
            <MailOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={styles.heroWrapper}>
        <Box
          component="img"
          src={new URL(`../assets/${cta.photo.src}`, import.meta.url).toString()}
          alt={cta.photo.alt}
          loading="lazy"
          sx={styles.heroImage}
        />
      </Box>
    </Stack>
  );
}

export default Header;
