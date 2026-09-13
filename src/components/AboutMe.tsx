import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import MuiMarkdown, { defaultOverrides } from 'mui-markdown';

import aboutMeMarkdownCs from '../content/about-me.cs.md?raw';
import aboutMeMarkdownEn from '../content/about-me.en.md?raw';
import { EXTERNAL_LINK_PROPS } from '../constants/links';
import { SECTION_IDS } from '../constants/sections';
import { ABOUT_ME_CONTENT } from '../data/aboutMeContent';
import { UI_TEXT } from '../data/uiText';
import { useLanguage } from '../context/useLanguage';
import { useSmoothScrollTo } from '../hooks/useSmoothScrollTo';
import {
  bold,
  bulletItem,
  bulletList,
  interactiveScale,
  linkRow,
  visuallyHidden,
} from '../theme/sharedStyles';
import { FOCUS_OUTLINE, TOUCH_TARGET_SIZE } from '../theme/tokens';

const aboutMeMarkdown = { cs: aboutMeMarkdownCs, en: aboutMeMarkdownEn } as const;

// Semantic tag stays h3 (see about-me.*.md), but rendered at the original h5 visual scale.
const aboutMeMarkdownOverrides = {
  ...defaultOverrides,
  h3: {
    component: Typography,
    props: { component: 'h3', variant: 'h5', sx: { ...bold, mt: 3 } },
  },
  // Former `**<u>…</u>**` pseudo-headings (see about-me.*.md): underline reads as a link on the
  // web, so they are real h4s now, sized to sit between the h3 and the body copy.
  h4: {
    component: Typography,
    props: { component: 'h4', variant: 'subtitle1', sx: { ...bold, mt: 2 } },
  },
};

const INTRO_HEADING_MARKER = '### ';

function splitIntroFromMarkdown(markdown: string): { intro: string; rest: string } {
  // Match a heading on the very first line too, which `indexOf('\n### ')` would miss.
  const headingIndex = markdown.startsWith(INTRO_HEADING_MARKER)
    ? 0
    : markdown.indexOf(`\n${INTRO_HEADING_MARKER}`);
  if (headingIndex === -1) return { intro: markdown, rest: '' };

  return {
    intro: markdown.slice(0, headingIndex).trim(),
    rest: markdown.slice(headingIndex).trim(),
  };
}

const styles = {
  title: bold,
  visuallyHidden,
  // The intro bullets are five independent facts, not an ordered process, so they carry no
  // numbering -- a counter here would assert a sequence the content does not have.
  introList: {
    '& ul': {
      listStyle: 'none',
      m: 0,
      p: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    },
    '& li': {
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      py: 1.5,
      px: 2,
      typography: 'body1',
      lineHeight: 1.6,
    },
  },
  markdown: {
    '& p': { mt: 1 },
    '& ul': { m: 0, pl: 2.5 },
    '& li': { mb: 1, '&:last-child': { mb: 0 } },
  },
  educationTitle: bold,
  educationCard: {
    p: 2,
    borderRadius: 1,
    bgcolor: 'info.main',
    // Pair the fill with its own computed foreground instead of inheriting `text.primary`,
    // which only happens to contrast with the current info hue.
    color: 'info.contrastText',
  },
  educationCardContent: { alignItems: 'flex-start' },
  educationCardTitle: bold,
  educationLink: { typography: 'body1', color: 'inherit', textDecoration: 'inherit', ...bold },
  educationLinkRowAnchor: {
    ...linkRow,
    ...interactiveScale,
    minHeight: TOUCH_TARGET_SIZE,
    py: 0.75,
    // Underlined so the link is distinguishable from the bold copy around it without relying
    // on colour alone (WCAG 1.4.1).
    textDecoration: 'underline',
    textUnderlineOffset: 3,
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover, &:focus-visible': { transform: 'none' },
    },
  },
  bulletList,
  bulletItem,
  referencesTitle: bold,
  // Quotations are not a bulleted list of facts; drop the discs and let the quote marks carry it.
  referenceList: { m: 0, p: 0, listStyle: 'none' },
  referenceItem: { mb: 1, '&:last-child': { mb: 0 } },
  referenceQuote: {
    m: 0,
    typography: 'body1',
    fontStyle: 'italic',
    '&::before': { content: 'open-quote' },
    '&::after': { content: 'close-quote' },
  },
  referencesAccordion: {
    width: '100%',
    bgcolor: 'transparent',
    boxShadow: 'none',
    '&:before': { display: 'none' },
  },
  referencesAccordionSummary: {
    px: 0,
    minHeight: TOUCH_TARGET_SIZE,
    '&.Mui-expanded': { minHeight: TOUCH_TARGET_SIZE },
    '& .MuiAccordionSummary-content': { m: 0 },
    '& .MuiAccordionSummary-content.Mui-expanded': { m: 0 },
    // The summary is a ButtonBase but lands here with no visible focus indicator, so give it
    // the same outline as the other focusable elements. `bgcolor` guards against the
    // full-width `action.focus` tint MUI's own AccordionSummary styles would otherwise apply.
    '&.Mui-focusVisible': {
      bgcolor: 'transparent',
      ...FOCUS_OUTLINE,
    },
  },
  referencesAccordionDetails: { px: 0, pt: 1 },
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

function hasCards(section: { title: string }): section is EducationSection {
  return 'cards' in section;
}

// Identify the section by its shape rather than by a title string duplicated in this file:
// renaming the heading in aboutMeContent.ts used to throw here and blank the whole page.
function getEducationSection(lang: 'cs' | 'en'): EducationSection | undefined {
  return ABOUT_ME_CONTENT[lang].sections.find(hasCards);
}

function AboutMe() {
  const { lang } = useLanguage();
  const content = ABOUT_ME_CONTENT[lang];
  const educationSection = getEducationSection(lang);
  const text = UI_TEXT[lang];
  const { quoteMarks } = text;
  const { intro, rest } = splitIntroFromMarkdown(aboutMeMarkdown[lang]);
  const smoothScrollTo = useSmoothScrollTo();

  return (
    <Stack component="section" id={SECTION_IDS.about} spacing={3} aria-labelledby="about-heading">
      <Typography id="about-heading" variant="h4" component="h2" align="center" sx={styles.title}>
        {content.title}
      </Typography>

      <Box sx={styles.introList}>
        <MuiMarkdown overrides={defaultOverrides}>{intro}</MuiMarkdown>
      </Box>

      <Box sx={styles.markdown}>
        <MuiMarkdown overrides={aboutMeMarkdownOverrides}>{rest}</MuiMarkdown>
      </Box>

      {educationSection && (
        <Stack spacing={2}>
          <Typography variant="h5" component="h3" sx={styles.educationTitle}>
            {educationSection.title}
          </Typography>

          {educationSection.cards.map((card: EducationCard, i: number) => (
            <Paper key={card.title} sx={styles.educationCard}>
              <Stack spacing={1} sx={styles.educationCardContent}>
                <Typography variant="h6" component="h4" sx={styles.educationCardTitle}>
                  {card.title}
                </Typography>

                <Box
                  component="a"
                  href={card.linkHref}
                  {...EXTERNAL_LINK_PROPS}
                  sx={styles.educationLinkRowAnchor}
                >
                  <LinkOutlinedIcon fontSize="small" />
                  <Typography sx={styles.educationLink}>{card.linkLabel}</Typography>
                  <Box component="span" sx={styles.visuallyHidden}>
                    {text.newTab}
                  </Box>
                </Box>

                <Box component="ul" sx={styles.bulletList}>
                  {card.bullets.map((bullet: string, bi: number) => (
                    <Box key={`${card.title}-b-${bi}`} component="li" sx={styles.bulletItem}>
                      <MuiMarkdown options={{ forceInline: true }}>{bullet}</MuiMarkdown>
                    </Box>
                  ))}
                </Box>

                {card.references && card.references.length > 0 && (
                  <Accordion
                    disableGutters
                    elevation={0}
                    // Scroll once the collapse has settled -- a fixed timeout raced the transition
                    // and landed on a position the panel had not reached yet.
                    slotProps={{
                      // MUI wraps the summary button in its own heading (h3 by default); set the
                      // level there -- a heading nested inside the button would be invalid and
                      // screen readers would still announce the outer h3.
                      heading: { component: 'h5' },
                      transition: {
                        onEntered: () => {
                          const header = document.getElementById(
                            `education-panel-${i}-references-header`,
                          );
                          if (header) smoothScrollTo(header);
                        },
                      },
                    }}
                    sx={styles.referencesAccordion}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`education-panel-${i}-references-content`}
                      id={`education-panel-${i}-references-header`}
                      sx={styles.referencesAccordionSummary}
                    >
                      <Typography variant="subtitle1" component="span" sx={styles.referencesTitle}>
                        {text.references}
                      </Typography>
                    </AccordionSummary>
                    {/* No id/aria-labelledby here: MUI's region wrapper takes both from the
                        summary's aria-controls/id, so repeating them would duplicate the id. */}
                    <AccordionDetails sx={styles.referencesAccordionDetails}>
                      <Box component="ul" sx={styles.referenceList}>
                        {card.references.map((quote, ri) => (
                          <Box
                            key={`${card.title}-r-${ri}`}
                            component="li"
                            sx={styles.referenceItem}
                          >
                            {/* Quote marks come from CSS `quotes`, so they follow the page
                                language (cs „…“ / en “…”) without living in the content strings. */}
                            <Box
                              component="blockquote"
                              sx={{
                                ...styles.referenceQuote,
                                quotes: `"${quoteMarks.open}" "${quoteMarks.close}"`,
                              }}
                            >
                              <MuiMarkdown options={{ forceInline: true }}>{quote}</MuiMarkdown>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default AboutMe;
