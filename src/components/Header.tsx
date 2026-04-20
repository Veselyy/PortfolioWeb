import { Box, IconButton, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { alpha, type Theme } from '@mui/material/styles';

import { CONTACT } from '../data/contact';
import { HEADER_CONTENT } from '../data/headerContent';

const styles = {
  headerWrapper: {
    alignItems: 'center',
    gap: 5,
  },
  headerContent: {
    width: { md: '70%', xs: '100%' },
  },
  subtitle: {
    fontWeight: 500,
    p: 0.5,
    border: '1px solid',
    borderColor: 'info.main',
    borderRadius: 1,
  },
  contactIconButton: {
    color: 'inherit',
    bgcolor: 'info.main',
    p: 1,
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
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} sx={styles.headerWrapper}>
      <Stack spacing={3} sx={styles.headerContent}>
        <Typography variant="h1" sx={{ fontWeight: '700' }}>
          {HEADER_CONTENT.heroTitle.parts.map((p, idx) => (
            <Box key={idx} component="span" sx={p.highlight ? { color: 'info.main' } : undefined}>
              {p.text}
            </Box>
          ))}
        </Typography>
        <Typography variant="h4">{HEADER_CONTENT.subtitle}</Typography>

        <Stack direction="row" spacing={2} sx={styles.availabilityCard}>
          <Box sx={styles.availabilityDot} />
          <Typography variant="body1">
            <strong>{HEADER_CONTENT.availability.strong}</strong> {HEADER_CONTENT.availability.rest}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="subtitle1" sx={styles.subtitle}>
            {HEADER_CONTENT.cta}
          </Typography>
          <IconButton
            component="a"
            href={CONTACT.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Kontaktovat přes WhatsApp"
            sx={styles.contactIconButton}
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            component="a"
            href={CONTACT.email.href}
            aria-label="Napsat e-mail"
            sx={styles.contactIconButton}
          >
            <MailOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={styles.heroWrapper}>
        <Box
          component="img"
          src={new URL(`../assets/${HEADER_CONTENT.photo.src}`, import.meta.url).toString()}
          alt={HEADER_CONTENT.photo.alt}
          loading="lazy"
          sx={styles.heroImage}
        />
      </Box>
    </Stack>
  );
}

export default Header;
