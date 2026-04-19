export const PROJECTS_CONTENT = {
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
          rest: ', který návštěvníkům vysvětluje principy jejich tvorby a nabízí praktické video-návody pro práci v online nástrojích.',
        },
        {
          strong: 'Samostatná realizace celého projektu',
          rest: ' od úvodního prototypu a designu až po finální kódování, což vyžadovalo disciplínu a plánování práce v rámci maturitního zadání.',
        },
        {
          strong: 'Vývoj postavený na čistém HTML, CSS a JavaScriptu',
          rest: ', díky čemuž jsem si upevnil znalost základních technologií ještě předtím, než jsem začal pracovat s Reactem a TypeScriptem.',
        },
        {
          strong: 'Úspěšné obhájení s výborným hodnocením',
          rest: ' od učitelů a pozitivní feedback od spolužáků, což se stalo motivací pro mé další prohlubování znalostí ve vývoji.',
        },
      ],
      image: {
        src: 'project_mind_maps.svg',
        alt: 'Náhled projektu Myšlenkové mapy',
      },
    },
  ],
} as const;
