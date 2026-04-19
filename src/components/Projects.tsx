import LinkIcon from '@mui/icons-material/Link';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { PROJECTS_CONTENT } from '../data/projectsContent';

const styles = {
  title: { fontWeight: 700 },
  card: {
    p: 2,
    borderRadius: 1,
    border: '1px solid',
    borderColor: (theme) =>
      theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  },
  cardContent: { alignItems: 'flex-start' },
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
    transition: (theme) =>
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
            <Stack spacing={1.5} sx={styles.cardContent}>
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
                <LinkIcon fontSize="small" />
                <Typography sx={styles.cardLink}>{card.githubLinkLabel}</Typography>
              </Box>

              <Box
                component="a"
                href={card.websiteLinkHref}
                target="_blank"
                rel="noreferrer"
                sx={styles.cardLinkRowAnchor}
              >
                <LanguageIcon fontSize="small" />
                <Typography sx={styles.cardLink}>{card.websiteLinkLabel}</Typography>
              </Box>

              <Box component="ul" sx={styles.bulletList}>
                {card.bullets.map((bullet) => (
                  <Box key={bullet} component="li" sx={styles.bulletItem}>
                    {bullet}
                  </Box>
                ))}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

export default Projects;
