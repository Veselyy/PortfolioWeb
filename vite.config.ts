import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

const GA_MEASUREMENT_ID = 'G-H7NS5VRYQ7';

const googleAnalyticsSnippet = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', '${GA_MEASUREMENT_ID}');
    </script>`;

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'inject-google-analytics',
      transformIndexHtml(html) {
        if (mode !== 'production') {
          return html;
        }

        return html.replace('<head>', `<head>${googleAnalyticsSnippet}`);
      },
    },
  ],
}));
