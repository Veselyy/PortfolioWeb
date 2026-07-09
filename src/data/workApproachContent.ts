import workApproachMarkdownCs from '../content/work-approach.cs.md?raw';
import workApproachMarkdownEn from '../content/work-approach.en.md?raw';

export const WORK_APPROACH_CONTENT = {
  cs: {
    title: 'Spolupráce a způsob práce',
    markdown: workApproachMarkdownCs,
  },
  en: {
    title: 'Collaboration and Work Approach',
    markdown: workApproachMarkdownEn,
  },
} as const;
