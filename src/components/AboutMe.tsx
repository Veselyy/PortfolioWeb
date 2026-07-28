import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import MuiMarkdown, { defaultOverrides } from 'mui-markdown';

import aboutMeMarkdownCs from '../content/about-me.cs.md?raw';
import aboutMeMarkdownEn from '../content/about-me.en.md?raw';
import { ABOUT_ME_CONTENT } from '../data/aboutMeContent';
import { useLanguage } from '../context/useLanguage';

const aboutMeMarkdown = { cs: aboutMeMarkdownCs, en: aboutMeMarkdownEn } as const;

// Semantic tag stays h3 (see about-me.*.md), but rendered at the original h5 visual scale.
const aboutMeMarkdownOverrides = {
  ...defaultOverrides,
  h3: {
    component: Typography,
    props: { component: 'h3', variant: 'h5', sx: { fontWeight: 700, mt: 3 } },
  },
};

const styles = {
  title: { fontWeight: 700 },
  markdown: {
    '& p': { mt: 1 },
    '& ul': { m: 0, pl: 2.5 },
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
  bulletItem: { typography: 'body1', mb: 1, '&:last-child': { mb: 0 } },
  referencesDivider: {
    width: '20%',
    mx: 'auto',
    my: 2,
    bgcolor: (theme: Theme) => (theme.palette.mode === 'dark' ? 'common.white' : 'common.black'),
  },
  referencesTitle: { fontWeight: 700 },
  referenceItem: { typography: 'body1', mb: 1, fontStyle: 'italic', '&:last-child': { mb: 0 } },
} as const;

const EDUCATION_SECTION_TITLE = {
  cs: 'Vzdělání, práce a brigády v IT',
  en: 'Education, work and IT jobs',
} as const;

const REFERENCES_TITLE = { cs: 'Reference', en: 'References' } as const;
const QUOTE_MARKS = {
  cs: { open: '„', close: '“' },
  en: { open: '“', close: '”' },
} as const;

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

function getEducationSection(lang: 'cs' | 'en'): EducationSection {
  const sectionTitle = EDUCATION_SECTION_TITLE[lang];
  const section = ABOUT_ME_CONTENT[lang].sections.find(
    (s) => 'cards' in s && s.title === sectionTitle,
  ) as EducationSection | undefined;

  if (!section) {
    throw new Error(`Missing section "${sectionTitle}" in ABOUT_ME_CONTENT`);
  }

  return section;
}

function AboutMe() {
  const { lang } = useLanguage();
  const content = ABOUT_ME_CONTENT[lang];
  const educationSection = getEducationSection(lang);
  const quoteMarks = QUOTE_MARKS[lang];

  return (
    <Stack component="section" id="about" spacing={3} aria-labelledby="about-heading">
      <Typography id="about-heading" variant="h4" component="h2" align="center" sx={styles.title}>
        {content.title}
      </Typography>

      <Box sx={styles.markdown}>
        <MuiMarkdown overrides={aboutMeMarkdownOverrides}>{aboutMeMarkdown[lang]}</MuiMarkdown>
      </Box>

      <Stack spacing={2}>
        <Typography variant="h5" component="h3" sx={styles.educationTitle}>
          {educationSection.title}
        </Typography>

        {educationSection.cards.map((card: EducationCard) => (
          <Paper key={card.title} sx={styles.educationCard}>
            <Stack spacing={1} sx={styles.educationCardContent}>
              <Typography variant="h6" component="h4" sx={styles.educationCardTitle}>
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
                {card.bullets.map((bullet: string, i: number) => (
                  <Box key={`${card.title}-b-${i}`} component="li" sx={styles.bulletItem}>
                    <MuiMarkdown options={{ forceInline: true }}>{bullet}</MuiMarkdown>
                  </Box>
                ))}
              </Box>

              {card.references && card.references.length > 0 && (
                <>
                  <Box sx={{ width: '100%' }}>
                    <Divider sx={styles.referencesDivider} />
                  </Box>

                  <Typography variant="subtitle1" component="h4" sx={styles.referencesTitle}>
                    {REFERENCES_TITLE[lang]}
                  </Typography>
                  <Box component="ul" sx={styles.bulletList}>
                    {card.references.map((quote, i) => (
                      <Box key={`${card.title}-r-${i}`} component="li" sx={styles.referenceItem}>
                        <Box component="span">
                          {quoteMarks.open}
                          <MuiMarkdown options={{ forceInline: true }}>{quote}</MuiMarkdown>
                          {quoteMarks.close}
                        </Box>
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
