const INTRO_HEADING_MARKER = '### ';

/**
 * Splits the About Me markdown into the intro bullets (everything before the first `###`
 * heading) and the rest, so the two parts can be styled differently.
 */
export function splitIntroFromMarkdown(markdown: string): { intro: string; rest: string } {
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
