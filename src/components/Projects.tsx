import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Box, Paper, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { CONTACT } from '../data/contact';
import { PROJECTS_CONTENT } from '../data/projectsContent';

const styles = {
  title: { fontWeight: 700 },
  card: {
    p: 2,
    borderRadius: 1,
    border: '1px solid',
    borderColor: (theme: Theme) =>
      theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  },
  cardLayout: {
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 5, md: 4 },
    alignItems: 'center',
  },
  cardImageWrapper: { width: { xs: '100%', md: '30%' }, flexShrink: 0 },
  cardImage: {
    width: '100%',
    p: { md: 0, sm: '0 20%', xs: '0 5%' },
  },
  cardTitle: { fontWeight: 700 },
  cardLink: { typography: 'body1', color: 'inherit', textDecoration: 'none', fontWeight: '700' },
  cardLinkRowAnchor: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    color: 'inherit',
    textDecoration: 'none',
    alignSelf: 'flex-start',
    width: 'fit-content',
    transformOrigin: 'left center',
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
  bulletList: {
    m: 0,
    pl: 2.5,
    listStyleType: 'disc',
  },
  bulletItem: { typography: 'body1', mb: 1, '&:last-child': { mb: 0 } },
  moreProjectsLink: { fontWeight: 700, textDecoration: 'underline', color: 'inherit' },
} as const;

function Projects() {
  return (
    <Stack id="projects" spacing={3}>
      <Typography variant="h4" align="center" sx={styles.title}>
        {PROJECTS_CONTENT.title}
      </Typography>

      <Stack spacing={3}>
        {PROJECTS_CONTENT.cards.map((card) => (
          <Paper key={card.title} sx={styles.card}>
            <Stack sx={styles.cardLayout}>
              <Stack spacing={1}>
                <Typography variant="h6" sx={styles.cardTitle}>
                  {card.title}
                </Typography>
                <Box
                  component="a"
                  href={card.githubLinkHref}
                  target="_blank"
                  rel="noreferrer"
                  sx={styles.cardLinkRowAnchor}
                >
                  <LinkOutlinedIcon fontSize="small" />
                  <Typography sx={styles.cardLink}>{card.githubLinkLabel}</Typography>
                </Box>

                <Box
                  component="a"
                  href={card.websiteLinkHref}
                  target="_blank"
                  rel="noreferrer"
                  sx={styles.cardLinkRowAnchor}
                >
                  <LanguageOutlinedIcon fontSize="small" />
                  <Typography sx={styles.cardLink}>{card.websiteLinkLabel}</Typography>
                </Box>

                <Box component="ul" sx={styles.bulletList}>
                  {card.bullets.map((bullet) => (
                    <Box key={bullet.strong} component="li" sx={styles.bulletItem}>
                      <strong>{bullet.strong}</strong>
                      {bullet.rest}
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
                  sx={styles.cardImage}
                />
              </Box>
            </Stack>
          </Paper>
        ))}

        <Paper sx={styles.card}>
          <Typography variant="body1">
            {PROJECTS_CONTENT.moreProjectsCta.text}{' '}
            <Box
              component="a"
              href={CONTACT.github.href}
              target="_blank"
              rel="noreferrer"
              sx={styles.moreProjectsLink}
            >
              {PROJECTS_CONTENT.moreProjectsCta.linkLabel}
            </Box>
          </Typography>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default Projects;
