/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IS_OPEN_TO_WORK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}
