import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import { useLanguage } from '../../context/useLanguage';
import { UI_TEXT } from '../../data/uiText';
import { useSmoothScrollTo } from '../../hooks/useSmoothScrollTo';
import { bold } from '../../theme/sharedStyles';
import { FOCUS_OUTLINE, TOUCH_TARGET_SIZE } from '../../theme/tokens';

const styles = {
  accordion: {
    width: '100%',
    bgcolor: 'transparent',
    boxShadow: 'none',
    '&:before': { display: 'none' },
  },
  summary: {
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
  title: bold,
  details: { px: 0, pt: 1 },
  // Quotations are not a bulleted list of facts; drop the discs and let the quote marks carry it.
  list: { m: 0, p: 0, listStyle: 'none' },
  item: { mb: 1, '&:last-child': { mb: 0 } },
  quote: {
    m: 0,
    typography: 'body1',
    fontStyle: 'italic',
    '&::before': { content: 'open-quote' },
    '&::after': { content: 'close-quote' },
  },
} as const;

type EducationReferencesProps = {
  /** Unique per card; used to build the accordion's header/content ids. */
  panelId: string;
  references: readonly string[];
};

/** Collapsible list of quotes from colleagues, shown under a job card. */
function EducationReferences({ panelId, references }: EducationReferencesProps) {
  const { lang } = useLanguage();
  const text = UI_TEXT[lang];
  const smoothScrollTo = useSmoothScrollTo();
  const headerId = `${panelId}-references-header`;

  return (
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
            const header = document.getElementById(headerId);
            if (header) smoothScrollTo(header);
          },
        },
      }}
      sx={styles.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelId}-references-content`}
        id={headerId}
        sx={styles.summary}
      >
        <Typography variant="subtitle1" component="span" sx={styles.title}>
          {text.references}
        </Typography>
      </AccordionSummary>
      {/* No id/aria-labelledby here: MUI's region wrapper takes both from the
          summary's aria-controls/id, so repeating them would duplicate the id. */}
      <AccordionDetails sx={styles.details}>
        <Box component="ul" sx={styles.list}>
          {references.map((quote, index) => (
            <Box key={`${panelId}-r-${index}`} component="li" sx={styles.item}>
              {/* Quote marks come from CSS `quotes`, so they follow the page
                  language (cs „…“ / en “…”) without living in the content strings. */}
              <Box
                component="blockquote"
                sx={{
                  ...styles.quote,
                  quotes: `"${text.quoteMarks.open}" "${text.quoteMarks.close}"`,
                }}
              >
                <MuiMarkdown options={{ forceInline: true }}>{quote}</MuiMarkdown>
              </Box>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default EducationReferences;
