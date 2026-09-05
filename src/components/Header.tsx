import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import WebIcon from '@mui/icons-material/Web';
import { alpha, type Theme } from '@mui/material/styles';

import { CONTACT } from '../data/contact';
import {
  HEADER_CONTENT,
  HEADER_CTA,
  HEADER_UNIVERSAL_EYEBROW,
  HEADER_UNIVERSAL_TITLE,
} from '../data/headerContent';
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
  eyebrowPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 999,
    px: 2,
    py: 0.75,
    width: 'fit-content',
  },
  eyebrowText: {
    fontWeight: 500,
    color: 'text.secondary',
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
  // 'info.main' is tuned as a background surface (icon buttons, cards) and is too light/dark
  // to use as text color directly against the page background (fails 3:1 contrast) —
  // 'highlight.main' is the paired foreground shade instead (see ThemeModeProvider).
  highlight: {
    color: (theme: Theme) => theme.palette.highlight.main,
  },
  heroImage: {
    width: '100%',
    aspectRatio: '1 / 1',
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
  const isOpenToWork = import.meta.env.VITE_IS_OPEN_TO_WORK === 'true';
  const titleParts = isOpenToWork ? intro.title.parts : HEADER_UNIVERSAL_TITLE[lang].parts;

  return (
    <Stack component="header" direction={{ xs: 'column', md: 'row' }} sx={styles.headerWrapper}>
      <Stack spacing={3} sx={styles.headerContent}>
        <Stack
          spacing={1}
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {!isOpenToWork && (
            <Stack direction="row" spacing={1} sx={styles.eyebrowPill}>
              <WebIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="subtitle2" component="span" sx={styles.eyebrowText}>
                {HEADER_UNIVERSAL_EYEBROW[lang]}
              </Typography>
            </Stack>
          )}
          <Typography variant="h1" sx={{ fontWeight: '700' }}>
            {titleParts.map((p, idx) => (
              <Box key={idx} component="span" sx={p.highlight ? styles.highlight : undefined}>
                {p.text}
              </Box>
            ))}
          </Typography>
        </Stack>
        {isOpenToWork && (
          <Typography variant="h4" component="p">
            {intro.subtitle}
          </Typography>
        )}

        {isOpenToWork && (
          <Stack direction="row" spacing={2} sx={styles.availabilityCard}>
            <Box sx={styles.availabilityDot} />
            <Typography variant="body1">
              <strong>{intro.availability.strong}</strong>
              {intro.availability.normal}
            </Typography>
          </Stack>
        )}

        {isOpenToWork && (
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
        )}
      </Stack>

      <Box sx={styles.heroWrapper}>
        <Box
          component="img"
          src={new URL(`../assets/${cta.photo.src}`, import.meta.url).toString()}
          alt={cta.photo.alt}
          loading="eager"
          fetchPriority="high"
          sx={styles.heroImage}
        />
      </Box>
    </Stack>
  );
}

export default Header;
