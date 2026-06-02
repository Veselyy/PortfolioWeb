export const HEADER_CONTENT = {
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
} as const;

export const HEADER_CTA = {
  title: 'Klidně se ozvěte',
  photo: {
    src: 'photo_of_me.png',
    alt: 'Profilová fotografie',
  },
} as const;
