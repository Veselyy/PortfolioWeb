# Portfolio Web

Osobní portfolio — responzivní jednostránková webová aplikace s přepínáním světlého a tmavého režimu.

**Stránky:** [martinvesely.netlify.app](https://martinvesely.netlify.app)

## Design

Návrh rozhraní ve Figmě: [Portfolio (Figma)](https://www.figma.com/design/ngYKYc1BqeqU4aX4Dt9JAf/Portfolio?node-id=1-2&t=dRxpI9N45NsHH9CQ-1)

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

- **Netlify** — hosting statické aplikace, SPA redirecty
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
```
