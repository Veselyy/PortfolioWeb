# Portfolio Web

Osobní portfolio — responzivní jednostránková webová aplikace s přepínáním světlého a tmavého režimu.

**Stránky:** [martinvesely.netlify.app](https://martinvesely.netlify.app)

## Design

Návrh rozhraní ve Figmě: [Portfolio (Figma)](https://www.figma.com/design/zznqhRm0Dif7eVXfq5EVW1/Portfolio?node-id=0-1&t=ZSddmSVTUA5sR8mt-1)

## Technologie

### Frontend

| Oblast             | Technologie                                                           |
| ------------------ | --------------------------------------------------------------------- |
| Framework          | [React](https://react.dev/)                                           |
| Jazyk              | [TypeScript](https://www.typescriptlang.org/)                         |
| Build & dev server | [Vite](https://vite.dev/)                                             |
| UI                 | [MUI (Material UI)](https://mui.com/), [Emotion](https://emotion.sh/) |
| Ikony              | [MUI Icons](https://mui.com/material-ui/material-icons/)              |
| Obsah (markdown)   | [mui-markdown](https://github.com/HPouyanmehr/mui-markdown)           |
| Font               | [Figtree](https://fonts.google.com/specimen/Figtree) (Google Fonts)   |

### Nástroje a kvalita kódu

- **pnpm** — správa balíčků
- **ESLint** + **typescript-eslint** — lint
- **Prettier** — formátování
- **Husky** — git hooky (pre-commit / pre-push)
- **GitHub Actions** — CI (`lint`, `format:check`)

### Nasazení a backend

- **Netlify** — hosting
- **Netlify Functions** + **Nodemailer** — odeslání kontaktního formuláře

## Spuštění lokálně

Požadavky: Node.js (viz `.nvmrc`), [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Další příkazy:

```bash
pnpm build    # produkční build
pnpm preview  # náhled buildu
pnpm lint
pnpm format
pnpm cv       # vygeneruje CV-FE/BE/SUPP a exportuje PDF
```

### Životopis (CV)

Obsah se skládá ze stejných zdrojů jako web (`about-me.md`, `work-approach.md`, data v `src/data/`). Hlavička a profil odpovídají parametru `?role=` na webu (`frontend`, `backend`, `support`).

| Soubor    | Role na webu     | Pozice                    |
| --------- | ---------------- | ------------------------- |
| `CV-FE`   | `?role=frontend` | Junior Frontend Developer |
| `CV-BE`   | `?role=backend`  | Junior Software Tester    |
| `CV-SUPP` | `?role=support`  | Junior IT Support         |

Sekce **Dovednosti** a **Koníčky** se z `aboutMeContent.ts` neberou — už jsou v `about-me.md` (stejně jako na stránce O mně).

```bash
pnpm cv:generate  # CV-FE.md, CV-BE.md, CV-SUPP.md
pnpm cv:pdf       # odpovídající PDF (vyžaduje pandoc)
pnpm cv:check     # ověří, že CV.md odpovídá obsahu webu
pnpm cv           # obojí
```

Po změně obsahu webu je potřeba spustit `pnpm cv` a commitnout i aktualizované `CV-*.md`. Jinak `pre-commit` / `pre-push` a CI selžou (`cv:check`).
