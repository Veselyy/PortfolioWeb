import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Box, Paper, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { ABOUT_ME_CONTENT } from '../data/aboutMeContent';

const styles = {
  title: { fontWeight: 700 },
  sectionTitle: { fontWeight: 700 },
  groupTitle: { fontWeight: 700, textDecoration: 'underline' },
  bulletList: {
    m: 0,
    pl: 2.5,
    listStyleType: 'disc',
  },
  bulletItem: { typography: 'body1', mb: 1, '&:last-child': { mb: 0 } },
  card: {
    p: 2,
    borderRadius: 1,
    bgcolor: 'info.main',
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
} as const;

function AboutMe() {
  return (
    <Stack id="about" spacing={3}>
      <Typography variant="h4" align="center" sx={styles.title}>
        {ABOUT_ME_CONTENT.title}
      </Typography>
      <Box component="ul" sx={styles.bulletList}>
        {ABOUT_ME_CONTENT.intro.map((p, idx) => (
          <Box key={idx} component="li" sx={styles.bulletItem}>
            {p.parts.map((part, i) =>
              part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>,
            )}
          </Box>
        ))}
      </Box>

      {ABOUT_ME_CONTENT.sections.map((section) => (
        <Stack key={section.title} spacing={1}>
          <Typography variant="h5" sx={styles.sectionTitle}>
            {section.title}
          </Typography>

          {'groups' in section &&
            section.groups.map((group) => (
              <Stack key={group.title} spacing={0.5}>
                <Typography variant="subtitle1" sx={styles.groupTitle}>
                  {group.title}
                </Typography>

                {'items' in group ? (
                  <Box component="ul" sx={styles.bulletList}>
                    <Box component="li" sx={styles.bulletItem}>
                      {group.items.join(', ')}
                    </Box>
                  </Box>
                ) : (
                  <Box component="ul" sx={styles.bulletList}>
                    <Box component="li" sx={styles.bulletItem}>
                      {group.description}
                    </Box>
                  </Box>
                )}
              </Stack>
            ))}

          {'cards' in section && (
            <Stack spacing={2}>
              {section.cards.map((card) => (
                <Paper key={card.title} sx={styles.card}>
                  <Stack spacing={1} sx={styles.cardContent}>
                    <Typography variant="h6" sx={styles.cardTitle}>
                      {card.title}
                    </Typography>
                    <Box
                      component="a"
                      href={card.linkHref}
                      target="_blank"
                      rel="noreferrer"
                      sx={styles.cardLinkRowAnchor}
                    >
                      <LinkOutlinedIcon fontSize="small" />
                      <Typography sx={styles.cardLink}>{card.linkLabel}</Typography>
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
          )}
        </Stack>
      ))}
    </Stack>
  );
}

export default AboutMe;
