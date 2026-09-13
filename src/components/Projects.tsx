import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { EXTERNAL_LINK_PROPS } from '../constants/links';
import { SECTION_IDS, sectionHeadingId } from '../constants/sections';
import { CONTACT } from '../data/contact';
import { PROJECTS_CONTENT } from '../data/projectsContent';
import { useLanguage } from '../context/useLanguage';
import {
  bold,
  bulletItem,
  bulletList,
  getContrastColor,
  interactiveScale,
  linkRow,
} from '../theme/sharedStyles';

const styles = {
  title: bold,
  card: {
    p: 2,
    borderRadius: 1,
    border: '1px solid',
    borderColor: getContrastColor,
  },
  cardLayout: {
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 5, md: 4 },
    alignItems: 'center',
  },
  cardImageWrapper: {
    width: { xs: '100%', md: '30%' },
    flexShrink: 0,
    px: { xs: '5%', sm: '20%', md: 0 },
  },
  cardImage: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  cardTitle: bold,
  cardLink: { typography: 'body1', color: 'inherit', textDecoration: 'none', ...bold },
  cardLinkRowAnchor: {
    ...linkRow,
    ...interactiveScale,
    textDecoration: 'none',
    transformOrigin: 'left center',
  },
  bulletList,
  bulletItem,
  moreProjectsLink: { ...bold, textDecoration: 'underline', color: 'inherit' },
} as const;

function Projects() {
  const { lang } = useLanguage();
  const content = PROJECTS_CONTENT[lang];
  const headingId = sectionHeadingId(SECTION_IDS.projects);

  return (
    <Stack component="section" id={SECTION_IDS.projects} spacing={3} aria-labelledby={headingId}>
      <Typography id={headingId} variant="h4" component="h2" align="center" sx={styles.title}>
        {content.title}
      </Typography>

      <Stack spacing={3}>
        {content.cards.map((card) => (
          <Paper key={card.title} sx={styles.card}>
            <Stack sx={styles.cardLayout}>
              <Stack spacing={1}>
                <Typography variant="h6" component="h3" sx={styles.cardTitle}>
                  {card.title}
                </Typography>
                <Box
                  component="a"
                  href={card.githubLinkHref}
                  {...EXTERNAL_LINK_PROPS}
                  sx={styles.cardLinkRowAnchor}
                >
                  <LinkOutlinedIcon fontSize="small" />
                  <Typography sx={styles.cardLink}>{card.githubLinkLabel}</Typography>
                </Box>

                <Box
                  component="a"
                  href={card.websiteLinkHref}
                  {...EXTERNAL_LINK_PROPS}
                  sx={styles.cardLinkRowAnchor}
                >
                  <LanguageOutlinedIcon fontSize="small" />
                  <Typography sx={styles.cardLink}>{card.websiteLinkLabel}</Typography>
                </Box>

                <Box component="ul" sx={styles.bulletList}>
                  {card.bullets.map((bullet) => (
                    <Box key={bullet.strong} component="li" sx={styles.bulletItem}>
                      <strong>{bullet.strong}</strong>
                      {bullet.normal}
                    </Box>
                  ))}
                </Box>
              </Stack>

              <Box sx={styles.cardImageWrapper}>
                <Box
                  component="img"
                  src={new URL(`../assets/${card.image.src}`, import.meta.url).toString()}
                  alt={card.image.alt}
                  loading="lazy"
                  width={card.image.width}
                  height={card.image.height}
                  sx={styles.cardImage}
                />
              </Box>
            </Stack>
          </Paper>
        ))}

        <Paper sx={styles.card}>
          <Typography variant="body1">
            {content.moreProjectsCta.text}{' '}
            <Box
              component="a"
              href={CONTACT.github.href}
              {...EXTERNAL_LINK_PROPS}
              sx={styles.moreProjectsLink}
            >
              {content.moreProjectsCta.linkLabel}
            </Box>
          </Typography>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default Projects;
