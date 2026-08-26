// Flip to false when no longer job-hunting to hide the availability card in the header.
export const IS_OPEN_TO_WORK = false;

export const HEADER_CONTENT = {
  cs: {
    frontend: {
      title: {
        parts: [
          { text: 'Weby na míru, moderní UI, ', highlight: false },
          { text: 'spolehlivě.', highlight: true },
        ],
      },
      subtitle: 'Junior Frontend Developer (React/TypeScript)',
      availability: {
        strong: 'Aktuálně se poohlížím po juniorní pozici (Frontend/Fullstack)',
        normal:
          ', kde využiji React/TypeScript. Nejvíc mi sedí práce v týmu, nebojím se zeptat a věci dotáhnu do konce.',
      },
    },
    backend: {
      title: {
        parts: [
          { text: 'Hledání chyb, kvalita softwaru, ', highlight: false },
          { text: 'precizně.', highlight: true },
        ],
      },
      subtitle: 'Junior Software Tester',
      availability: {
        strong: 'Aktuálně se poohlížím po juniorní pozici v testování softwaru',
        normal:
          ', kde uplatním své analytické myšlení a smysl pro detail. Baví mě objevovat hraniční případy, psát testy a dbát na to, aby kód fungoval bez chyb.',
      },
    },
    support: {
      title: {
        parts: [
          { text: 'Analýza problémů, správa systémů, ', highlight: false },
          { text: 's přehledem.', highlight: true },
        ],
      },
      subtitle: 'Junior IT Support',
      availability: {
        strong: 'Aktuálně se poohlížím po roli v IT Supportu',
        normal:
          ', kde využiji své znalosti sítí a operačních systémů. Rád přicházím na kloub technické výzvě, baví mě komunikace a věci dotáhnu do konce.',
      },
    },
  },
  en: {
    frontend: {
      title: {
        parts: [
          { text: 'Custom-built websites, modern UI, ', highlight: false },
          { text: 'built to last.', highlight: true },
        ],
      },
      subtitle: 'Junior Frontend Developer (React/TypeScript)',
      availability: {
        strong: 'Currently looking for a junior position (Frontend/Fullstack)',
        normal:
          " where I can put React/TypeScript to use. I work best in a team, I'm not afraid to ask, and I follow things through to the end.",
      },
    },
    backend: {
      title: {
        parts: [
          { text: 'Finding bugs, software quality, ', highlight: false },
          { text: 'with precision.', highlight: true },
        ],
      },
      subtitle: 'Junior Software Tester',
      availability: {
        strong: 'Currently looking for a junior position in software testing',
        normal:
          ' where I can apply my analytical thinking and eye for detail. I enjoy uncovering edge cases, writing tests, and making sure the code works without bugs.',
      },
    },
    support: {
      title: {
        parts: [
          { text: 'Problem analysis, systems administration, ', highlight: false },
          { text: 'with a clear overview.', highlight: true },
        ],
      },
      subtitle: 'Junior IT Support',
      availability: {
        strong: 'Currently looking for a role in IT Support',
        normal:
          ' where I can put my knowledge of networks and operating systems to use. I enjoy getting to the bottom of a technical challenge, I like communicating with people, and I see things through to the end.',
      },
    },
  },
} as const;

export const HEADER_CTA = {
  cs: {
    title: 'Klidně se ozvěte',
    photo: {
      src: 'photo_of_me.webp',
      alt: 'Martin Veselý, portrétní fotografie',
    },
  },
  en: {
    title: 'Feel free to reach out',
    photo: {
      src: 'photo_of_me.webp',
      alt: 'Martin Veselý, portrait photo',
    },
  },
} as const;
