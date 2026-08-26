import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted Figtree, served same-origin instead of the render-blocking
// fonts.googleapis.com -> fonts.gstatic.com round trip. See fonts.css for the @font-face
// rules and the metric-matched fallback.
import './fonts.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
