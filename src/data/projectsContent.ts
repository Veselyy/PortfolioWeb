export const PROJECTS_CONTENT = {
  cs: {
    title: 'Projekty',
    moreProjectsCta: {
      text: 'Ostatní projekty najdete na',
      linkLabel: 'GitHubu',
    },
    cards: [
      {
        title: 'Myšlenkové mapy',
        githubLinkLabel: 'Odkaz na GitHub',
        githubLinkHref: 'https://github.com/Veselyy/MATURITA',
        websiteLinkLabel: 'Přejít na stránku',
        websiteLinkHref: 'https://myslenkovemapy.netlify.app',
        bullets: [
          {
            strong: 'Edukativní web zaměřený na metodiku myšlenkových map',
            normal:
              ', který návštěvníkům vysvětluje principy jejich tvorby a nabízí praktické video-návody pro práci v online nástrojích.',
          },
          {
            strong: 'Samostatná realizace celého projektu',
            normal:
              ' od úvodního prototypu a designu až po finální kódování, což vyžadovalo disciplínu a plánování práce v rámci maturitního zadání.',
          },
          {
            strong: 'Vývoj postavený na čistém HTML, CSS a JavaScriptu',
            normal:
              ', díky čemuž jsem si upevnil znalost základních technologií ještě předtím, než jsem začal pracovat s Reactem a TypeScriptem.',
          },
          {
            strong: 'Úspěšné obhájení s výborným hodnocením',
            normal:
              ' od učitelů a pozitivní feedback od spolužáků, což se stalo motivací pro mé další prohlubování znalostí ve vývoji.',
          },
        ],
        image: {
          src: 'project_mind_maps.svg',
          alt: 'Náhled projektu Myšlenkové mapy',
        },
      },
    ],
  },
  en: {
    title: 'Projects',
    moreProjectsCta: {
      text: 'More projects can be found on',
      linkLabel: 'GitHub',
    },
    cards: [
      {
        title: 'Mind Maps',
        githubLinkLabel: 'Link to GitHub',
        githubLinkHref: 'https://github.com/Veselyy/MATURITA',
        websiteLinkLabel: 'Go to website',
        websiteLinkHref: 'https://myslenkovemapy.netlify.app',
        bullets: [
          {
            strong: 'An educational website focused on mind-mapping methodology',
            normal:
              ', explaining the principles of creating mind maps to visitors and offering practical video tutorials for working with online tools.',
          },
          {
            strong: 'Built the entire project single-handedly',
            normal:
              ', from the initial prototype and design to the final coding, which required discipline and planning as part of my high school final exam project.',
          },
          {
            strong: 'Built with plain HTML, CSS, and JavaScript',
            normal:
              ', which let me solidify my knowledge of the fundamentals before I started working with React and TypeScript.',
          },
          {
            strong: 'Successfully defended with an excellent grade',
            normal:
              ' from the teachers and positive feedback from classmates, which motivated me to keep deepening my development skills.',
          },
        ],
        image: {
          src: 'project_mind_maps.svg',
          alt: 'Preview of the Mind Maps project',
        },
      },
    ],
  },
} as const;
