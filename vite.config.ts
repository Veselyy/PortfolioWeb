import path from 'node:path';
import fs from 'node:fs';

import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

import { SEO_CONTENT } from './src/data/seoContent';

// Netlify sets CONTEXT during its own build ("production", "deploy-preview", "branch-deploy",
// or "dev" under `netlify dev`); it's undefined for a plain local `pnpm build`. Only the
// production context should be indexable — previews/branch deploys and local builds default
// to noindex so a stray deploy never ends up in search results.
const isProductionDeploy = process.env.CONTEXT === 'production';

// OG/Twitter crawlers and the JSON-LD script read the static index.html directly and never run
// the client-side JS that keeps <title>/<meta description> in sync with the language toggle —
// so the job-hunting/portfolio SEO variant has to be baked in at build time instead.
function seoHtmlPlugin(isOpenToWork: boolean): Plugin {
  const seo = SEO_CONTENT.cs[isOpenToWork ? 'jobHunting' : 'portfolio'];
  const robots = isProductionDeploy ? 'index, follow' : 'noindex, nofollow';

  return {
    name: 'inject-seo-html',
    transformIndexHtml(html) {
      const withTags = html
        .replaceAll('%SEO_TITLE%', seo.title)
        .replaceAll('%SEO_ROBOTS%', robots)
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

// Belt-and-suspenders alongside the <meta name="robots"> tag: emits a Netlify `_headers` file
// so non-production deploys also send `X-Robots-Tag: noindex` at the HTTP level. Production
// gets no such file, since netlify.toml's own [[headers]] block already covers its headers.
function robotsHeaderPlugin(): Plugin {
  return {
    name: 'emit-robots-header',
    writeBundle(options) {
      if (isProductionDeploy) return;

      const outDir = options.dir ?? 'dist';
      fs.writeFileSync(path.join(outDir, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n');
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
      robotsHeaderPlugin(),
    ],
  };
});
