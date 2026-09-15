import { Box } from '@mui/material';
import { alpha, type Theme } from '@mui/material/styles';

import { getContrastColor } from '../../theme/sharedStyles';
import { EFFECTS, RADIUS } from '../../theme/tokens';

const styles = {
  wrapper: {
    width: { md: '25%', xs: '100%' },
    p: { md: 0, xs: '0 20%' },
  },
  image: {
    display: 'block',
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: RADIUS.circle,
    boxShadow: (theme: Theme) =>
      `0 0 ${EFFECTS.heroShadowBlur} ${alpha(getContrastColor(theme), EFFECTS.heroShadowAlpha)}`,
  },
} as const;

type HeroPhotoProps = {
  /** File name inside `src/assets/`. */
  src: string;
  alt: string;
};

/** Round portrait next to the hero title — the LCP element, so it loads eagerly at high priority. */
function HeroPhoto({ src, alt }: HeroPhotoProps) {
  return (
    <Box sx={styles.wrapper}>
      <Box
        component="img"
        src={new URL(`../../assets/${src}`, import.meta.url).toString()}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        sx={styles.image}
      />
    </Box>
  );
}

export default HeroPhoto;
