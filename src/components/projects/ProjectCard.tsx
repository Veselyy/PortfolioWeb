import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { bold, bulletItem, bulletList } from '../../theme/sharedStyles';
import ProjectLink from './ProjectLink';
import { projectCardSurface } from './styles';

const styles = {
  card: projectCardSurface,
  layout: {
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 5, md: 4 },
    alignItems: 'center',
  },
  title: bold,
  bulletList,
  bulletItem,
  imageWrapper: {
    width: { xs: '100%', md: '30%' },
    flexShrink: 0,
    px: { xs: '5%', sm: '20%', md: 0 },
  },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
} as const;

type ProjectCardData = {
  title: string;
  githubLinkLabel: string;
  githubLinkHref: string;
  websiteLinkLabel: string;
  websiteLinkHref: string;
  bullets: readonly { strong: string; normal: string }[];
  image: { src: string; alt: string; width: number; height: number };
};

/** One project: title, links, bullet points and a preview image. */
function ProjectCard({ card }: { card: ProjectCardData }) {
  return (
    <Paper sx={styles.card}>
      <Stack sx={styles.layout}>
        <Stack spacing={1}>
          <Typography variant="h6" component="h3" sx={styles.title}>
            {card.title}
          </Typography>

          <ProjectLink
            href={card.githubLinkHref}
            label={card.githubLinkLabel}
            icon={<LinkOutlinedIcon fontSize="small" />}
          />
          <ProjectLink
            href={card.websiteLinkHref}
            label={card.websiteLinkLabel}
            icon={<LanguageOutlinedIcon fontSize="small" />}
          />

          <Box component="ul" sx={styles.bulletList}>
            {card.bullets.map((bullet) => (
              <Box key={bullet.strong} component="li" sx={styles.bulletItem}>
                <strong>{bullet.strong}</strong>
                {bullet.normal}
              </Box>
            ))}
          </Box>
        </Stack>

        <Box sx={styles.imageWrapper}>
          <Box
            component="img"
            src={new URL(`../../assets/${card.image.src}`, import.meta.url).toString()}
            alt={card.image.alt}
            loading="lazy"
            width={card.image.width}
            height={card.image.height}
            sx={styles.image}
          />
        </Box>
      </Stack>
    </Paper>
  );
}

export default ProjectCard;
