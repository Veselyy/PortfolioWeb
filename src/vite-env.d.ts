/// <reference types="vite/client" />

interface Window {
  dataLayer: unknown[][];
  gtag: (...args: unknown[]) => void;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}
