import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import WebIcon from '@mui/icons-material/Web';
import { alpha, type Theme } from '@mui/material/styles';

import { IS_OPEN_TO_WORK } from '../constants/env';
import { EXTERNAL_LINK_PROPS } from '../constants/links';
import { SECTION_IDS, sectionHref } from '../constants/sections';
import { CONTACT } from '../data/contact';
import {
  HEADER_CONTENT,
  HEADER_CTA,
  HEADER_UNIVERSAL_EYEBROW,
  HEADER_UNIVERSAL_TITLE,
} from '../data/headerContent';
import { useHeaderRoleFromQuery } from '../hooks/useHeaderRoleFromQuery';
import { UI_TEXT } from '../data/uiText';
import { useLanguage } from '../context/useLanguage';
import { bold, getContrastColor } from '../theme/sharedStyles';
import { EFFECTS, FONT_WEIGHT, RADIUS, TOUCH_TARGET_SIZE } from '../theme/tokens';

const styles = {
  headerWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: { xs: 3, md: 0 },
  },
  headerContent: {
    width: { md: '65%', xs: '100%' },
  },
  eyebrowPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: RADIUS.pill,
    px: 2,
    py: 0.75,
    width: 'fit-content',
    alignSelf: { xs: 'center', md: 'flex-start' },
  },
  eyebrowText: {
    fontWeight: FONT_WEIGHT.medium,
    color: 'text.secondary',
  },
  ctaButton: {
    ...bold,
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
    minWidth: TOUCH_TARGET_SIZE,
    minHeight: TOUCH_TARGET_SIZE,
    '&:hover, &:focus-visible': { bgcolor: 'info.main' },
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.circle,
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
    width: { md: '25%', xs: '100%' },
    p: { md: 0, xs: '0 20%' },
  },
  // 'info.main' is tuned as a background surface (icon buttons, cards) and is too light/dark
  // to use as text color directly against the page background (fails 3:1 contrast) —
  // 'highlight.main' is the paired foreground shade instead (see ThemeModeProvider).
  highlight: {
    color: (theme: Theme) => theme.palette.highlight.main,
  },
  heroImage: {
    display: 'block',
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: RADIUS.circle,
    boxShadow: (theme: Theme) =>
      `0 0 ${EFFECTS.heroShadowBlur} ${alpha(getContrastColor(theme), EFFECTS.heroShadowAlpha)}`,
  },
  header: { gap: { xs: 3, md: 0 } },
  eyebrowIcon: { color: 'text.secondary' },
  title: {
    ...bold,
    textAlign: { xs: 'center', md: 'left' },
  },
  ctaRow: { alignItems: 'center', flexWrap: 'wrap' },
} as const;

function Header() {
  const { lang } = useLanguage();
  const role = useHeaderRoleFromQuery();
  const intro = HEADER_CONTENT[lang][role];
  const cta = HEADER_CTA[lang];
  const contactAriaLabels = UI_TEXT[lang].contactAria;
  const titleParts = IS_OPEN_TO_WORK ? intro.title.parts : HEADER_UNIVERSAL_TITLE[lang].parts;

  return (
    <Stack component="header" sx={styles.header}>
      {!IS_OPEN_TO_WORK && (
        <Stack direction="row" spacing={1} sx={styles.eyebrowPill}>
          <WebIcon fontSize="small" sx={styles.eyebrowIcon} />
          <Typography variant="subtitle2" component="span" sx={styles.eyebrowText}>
            {HEADER_UNIVERSAL_EYEBROW[lang]}
          </Typography>
        </Stack>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} sx={styles.headerWrapper}>
        <Stack spacing={3} sx={styles.headerContent}>
          <Typography variant="h1" sx={styles.title}>
            {titleParts.map((p, idx) => (
              <Box key={idx} component="span" sx={p.highlight ? styles.highlight : undefined}>
                {p.text}
              </Box>
            ))}
          </Typography>
          {IS_OPEN_TO_WORK && (
            <Typography variant="h4" component="h2">
              {intro.subtitle}
            </Typography>
          )}

          {IS_OPEN_TO_WORK && (
            <Stack direction="row" spacing={2} sx={styles.availabilityCard}>
              <Box sx={styles.availabilityDot} />
              <Typography variant="body1">
                <strong>{intro.availability.strong}</strong>
                {intro.availability.normal}
              </Typography>
            </Stack>
          )}

          {IS_OPEN_TO_WORK && (
            <Stack direction="row" spacing={3} sx={styles.ctaRow}>
              <Button
                component="a"
                href={sectionHref(SECTION_IDS.contact)}
                variant="outlined"
                color="info"
                sx={styles.ctaButton}
              >
                {cta.title}
              </Button>
              <IconButton
                component="a"
                href={CONTACT.whatsapp.href}
                {...EXTERNAL_LINK_PROPS}
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
    </Stack>
  );
}

export default Header;
