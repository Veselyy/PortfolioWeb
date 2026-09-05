import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

import { SEO_CONTENT } from './src/data/seoContent';

// OG/Twitter crawlers and the JSON-LD script read the static index.html directly and never run
// the client-side JS that keeps <title>/<meta description> in sync with the language toggle —
// so the job-hunting/portfolio SEO variant has to be baked in at build time instead.
function seoHtmlPlugin(isOpenToWork: boolean): Plugin {
  const seo = SEO_CONTENT.cs[isOpenToWork ? 'jobHunting' : 'portfolio'];

  return {
    name: 'inject-seo-html',
    transformIndexHtml(html) {
      const withTags = html
        .replaceAll('%SEO_TITLE%', seo.title)
        .replaceAll('%SEO_DESCRIPTION%', seo.description)
        .replaceAll('%SEO_OG_TITLE%', seo.ogTitle)
        .replaceAll('%SEO_OG_DESCRIPTION%', seo.ogDescription)
        .replaceAll('%SEO_OG_IMAGE%', seo.ogImage);

      // Person.jobTitle only makes sense for the job-hunting variant — drop the whole
      // line when the active variant doesn't define one, rather than emitting an empty string.
      const jobTitle = 'jobTitle' in seo ? seo.jobTitle : undefined;
      return jobTitle
        ? withTags.replaceAll('%SEO_JOB_TITLE%', jobTitle)
        : withTags.replace(/\s*"jobTitle":\s*"%SEO_JOB_TITLE%",\n/, '\n');
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isOpenToWork = env.VITE_IS_OPEN_TO_WORK === 'true';

  return {
    plugins: [
      react({ babel: { plugins: [['babel-plugin-react-compiler', {}]] } }),
      seoHtmlPlugin(isOpenToWork),
    ],
  };
});
