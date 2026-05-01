import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Box, Paper, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import MuiMarkdown from 'mui-markdown';

import aboutMeMarkdown from '../content/about-me.md?raw';
import { ABOUT_ME_CONTENT } from '../data/aboutMeContent';

const styles = {
  title: { fontWeight: 700 },
  markdown: {
    '& p': { mt: 1 },
    '& ul': { m: 0, pl: 2.5 },
    '& h5': { fontWeight: 700, mt: 3 },
    '& li': { mb: 1, '&:last-child': { mb: 0 } },
  },
  educationTitle: { fontWeight: 700 },
  educationCard: {
    p: 2,
    borderRadius: 1,
    bgcolor: 'info.main',
  },
  educationCardContent: { alignItems: 'flex-start' },
  educationCardTitle: { fontWeight: 700 },
  educationLink: { typography: 'body1', color: 'inherit', textDecoration: 'none', fontWeight: 700 },
  educationLinkRowAnchor: {
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
  bulletList: { m: 0, pl: 2.5, listStyleType: 'disc' },
  bulletItem: { typography: 'body1', mb: 1, '&:last-child': { mb: 0 }, fontStyle: 'italic' },
  referencesTitle: { fontWeight: 700, mt: 1 },
} as const;

const EDUCATION_SECTION_TITLE = 'Vzdělání, práce a brigády v IT';

type EducationCard = {
  title: string;
  linkLabel: string;
  linkHref: string;
  bullets: readonly string[];
  references?: readonly string[];
};

type EducationSection = {
  title: string;
  cards: readonly EducationCard[];
};

function getEducationSection(): EducationSection {
  const section = ABOUT_ME_CONTENT.sections.find(
    (s) => 'cards' in s && s.title === EDUCATION_SECTION_TITLE,
  ) as EducationSection | undefined;

  if (!section) {
    throw new Error(`Missing section "${EDUCATION_SECTION_TITLE}" in ABOUT_ME_CONTENT`);
  }

  return section;
}

function AboutMe() {
  const educationSection = getEducationSection();

  return (
    <Stack id="about" spacing={3}>
      <Typography variant="h4" align="center" sx={styles.title}>
        O Mně
      </Typography>

      <Box sx={styles.markdown}>
        <MuiMarkdown>{aboutMeMarkdown}</MuiMarkdown>
      </Box>

      <Stack spacing={2}>
        <Typography variant="h5" sx={styles.educationTitle}>
          {educationSection.title}
        </Typography>

        {educationSection.cards.map((card: EducationCard) => (
          <Paper key={card.title} sx={styles.educationCard}>
            <Stack spacing={1} sx={styles.educationCardContent}>
              <Typography variant="h6" sx={styles.educationCardTitle}>
                {card.title}
              </Typography>

              <Box
                component="a"
                href={card.linkHref}
                target="_blank"
                rel="noreferrer"
                sx={styles.educationLinkRowAnchor}
              >
                <LinkOutlinedIcon fontSize="small" />
                <Typography sx={styles.educationLink}>{card.linkLabel}</Typography>
              </Box>

              <Box component="ul" sx={styles.bulletList}>
                {card.bullets.map((bullet: string) => (
                  <Box key={bullet} component="li" sx={styles.bulletItem}>
                    {bullet}
                  </Box>
                ))}
              </Box>

              {card.references && card.references.length > 0 && (
                <>
                  <Typography variant="subtitle1" sx={styles.referencesTitle}>
                    Reference
                  </Typography>
                  <Box component="ul" sx={styles.bulletList}>
                    {card.references.map((quote) => (
                      <Box key={quote} component="li" sx={styles.bulletItem}>
                        {`"${quote}"`}
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

export default AboutMe;
