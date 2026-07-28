import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    react({ babel: { plugins: [['babel-plugin-react-compiler', {}]] } }),
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
