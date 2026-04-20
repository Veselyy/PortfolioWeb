export const ABOUT_ME_CONTENT = {
  title: 'O Mně',
  intro: [
    {
      parts: [
        { text: 'Zdravím, já jsem Martin, jsem z venkova a věnuji se ', bold: false },
        { text: 'IT', bold: true },
        { text: ' už ', bold: false },
        { text: '4. rokem', bold: true },
        { text: ' a jsem také ', bold: false },
        { text: 'OSVČ', bold: true },
        { text: '.', bold: false },
      ],
    },
    {
      parts: [
        { text: 'Jsem ', bold: false },
        { text: 'student', bold: true },
        {
          text: ', rád dělám sporty a rád se bavím s lidmi, kteří mi mají co předat.',
          bold: false,
        },
      ],
    },
    {
      parts: [
        { text: 'Můj silný zájem o učení a ', bold: false },
        { text: 'osobní rozvoj', bold: true },
        { text: ' mě motivuje využívat každou ', bold: false },
        { text: 'příležitost', bold: true },
        { text: ' ke kariérnímu růstu.', bold: false },
      ],
    },
    {
      parts: [
        { text: 'Rád budu ', bold: false },
        { text: 'čelit', bold: true },
        { text: ' novým výzvám a ', bold: false },
        { text: 'rád přispěju', bold: true },
        { text: ' ke společnému úspěchu.', bold: false },
      ],
    },
    {
      parts: [
        { text: 'Angličtina pro mě není překážka - gramatiku mám na úrovni ', bold: false },
        { text: 'B1', bold: true },
        { text: ' a v mluvení jsem mezi ', bold: false },
        { text: 'A2 - B1.', bold: true },
      ],
    },
  ],
  sections: [
    {
      title: 'Dovednosti',
      groups: [
        {
          title: '2-3 roky zkušeností',
          items: [
            'React',
            'Figma',
            'HTML',
            'CSS',
            'TypeScript',
            'C',
            'Vite',
            'Git',
            'GitHub/GitLab',
            'spolupráce s AI',
          ],
        },
        {
          title: '1 rok zkušeností',
          items: ['REST API', 'SQL'],
        },
      ],
    },
    {
      title: 'Koníčky',
      groups: [
        { title: 'Sport', description: 'Jakýkoliv sport, který mě udržuje aktivním a fit.' },
        {
          title: 'Učení nových věcí',
          description: 'Rád se učím nové technologie, dovednosti a rozšiřuji své znalosti.',
        },
        {
          title: 'Komunikace',
          description: 'Komunikace s lidmi s podobným zájmem mě inspiruje a motivuje.',
        },
        {
          title: 'Svět v IT',
          description: 'Věnuji se programování, designu aplikací a hledání inovativních řešení.',
        },
      ],
    },

    {
      title: 'Vzdělání, práce a brigády v IT',
      cards: [
        {
          title: 'Střední škola (2020-2024)',
          linkLabel: 'SPŠ Žďár nad Sázavou',
          linkHref: 'https://www.spszr.cz/',
          bullets: ['Studoval jsem obor IT, zaměřený na programování a správu sítí…'],
        },
        {
          title: 'Vysoká škola (2024-202x)',
          linkLabel: 'VUT FIT v Brně',
          linkHref: 'https://www.vut.cz',
          bullets: [
            'Studuji obor FIT(IT), zaměřený především na vývoj softwarových řešení od algoritmů a datových struktur, přes umělou inteligenci až po softwarové inženýrství.',
            'Dále se věnuje kybernetické bezpečnosti, vestavným systémům a IoT, digitálnímu zpracování signálu a obrazu, telekomunikačním a síťovým technologiím...',
          ],
        },
        {
          title:
            'Brigáda u Commity (1.6.2024 - 10.9.2024), (1.6.2025 - 15.9.2025), (externí spolupráce během roku 2026)',
          linkLabel: 'Commity',
          linkHref: 'https://commity.cz',
          bullets: [
            'Pracoval jsem primárně na frontendu webových aplikací (TSX, React).',
            'Také jsem si sáhl na práci s daty v Metabase (SQL dotazy) a na práci s API (REST, Postman).',
            'V rámci práce jsem se podílel na vývoji a údržbě webových aplikací pro naše klienty.',
            'Měl jsem možnost pracovat na různých projektech, které mi umožnily rozvíjet své dovednosti v oblasti programování, komunikace v týmu, organizace práce a time managementu...',
          ],
        },
      ],
    },
  ],
} as const;
