import { Stack, Typography } from '@mui/material';

import { IS_OPEN_TO_WORK } from '../constants/env';
import { useLanguage } from '../context/useLanguage';
import {
  HEADER_CONTENT,
  HEADER_CTA,
  HEADER_UNIVERSAL_EYEBROW,
  HEADER_UNIVERSAL_TITLE,
} from '../data/headerContent';
import { useHeaderRoleFromQuery } from '../hooks/useHeaderRoleFromQuery';
import AvailabilityCard from './header/AvailabilityCard';
import EyebrowPill from './header/EyebrowPill';
import HeaderCta from './header/HeaderCta';
import HeroPhoto from './header/HeroPhoto';
import HeroTitle from './header/HeroTitle';

const styles = {
  header: { gap: { xs: 3, md: 0 } },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: { xs: 3, md: 0 },
  },
  content: {
    width: { md: '65%', xs: '100%' },
  },
} as const;

/**
 * Hero at the top of the page. Two variants, switched by `IS_OPEN_TO_WORK`:
 * job-hunting (role-specific title, subtitle, availability card, contact CTA) and
 * portfolio (universal title with an eyebrow pill).
 */
function Header() {
  const { lang } = useLanguage();
  const role = useHeaderRoleFromQuery();
  const intro = HEADER_CONTENT[lang][role];
  const cta = HEADER_CTA[lang];
  const titleParts = IS_OPEN_TO_WORK ? intro.title.parts : HEADER_UNIVERSAL_TITLE[lang].parts;

  return (
    <Stack component="header" sx={styles.header}>
      {!IS_OPEN_TO_WORK && <EyebrowPill text={HEADER_UNIVERSAL_EYEBROW[lang]} />}

      <Stack direction={{ xs: 'column', md: 'row' }} sx={styles.row}>
        <Stack spacing={3} sx={styles.content}>
          <HeroTitle parts={titleParts} />

          {IS_OPEN_TO_WORK && (
            <>
              <Typography variant="h4" component="h2">
                {intro.subtitle}
              </Typography>
              <AvailabilityCard availability={intro.availability} />
              <HeaderCta title={cta.title} />
            </>
          )}
        </Stack>

        <HeroPhoto src={cta.photo.src} alt={cta.photo.alt} />
      </Stack>
    </Stack>
  );
}

export default Header;
