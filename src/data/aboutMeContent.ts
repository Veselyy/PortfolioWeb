export const ABOUT_ME_CONTENT = {
  cs: {
    title: 'O Mně',
    sections: [
      {
        title: 'Vzdělání, práce a brigády v IT',
        cards: [
          {
            title: 'Střední škola (2020-2024)',
            linkLabel: 'SPŠ Žďár nad Sázavou',
            linkHref: 'https://www.spszr.cz/',
            bullets: ['Studoval jsem obor **IT**, zaměřený na **programování** a **správu sítí**…'],
          },
          {
            title: 'Vysoká škola (2024-202x)',
            linkLabel: 'VUT FIT v Brně',
            linkHref: 'https://www.vut.cz',
            bullets: [
              'Studuji obor **FIT(IT)**, zaměřený především na vývoj softwarových řešení od algoritmů a datových struktur, přes **umělou inteligenci** až po **softwarové inženýrství**.',
              'Dále se věnuje kybernetické bezpečnosti, vestavným systémům a IoT, digitálnímu zpracování signálu a obrazu, telekomunikačním a síťovým technologiím...',
            ],
          },
          {
            title:
              'Brigáda u Commity (1.6.2024 - 10.9.2024), (1.6.2025 - 15.9.2025), (externí spolupráce během roku 2026)',
            linkLabel: 'Commity',
            linkHref: 'https://commity.cz',
            bullets: [
              'Pracoval jsem primárně na **frontendu** webových aplikací (TSX, **React**).',
              'Také jsem si sáhl na práci s daty v **Metabase** (**SQL** dotazy) a na práci s **API** (**REST**, **Postman**).',
              'Vyzkoušel jsem testování webových aplikací v **Cypress** podle zadání od týmu i vlastní iniciativou - zajímalo mě, jestli to tak opravdu má fungovat, jestli je přístup správný a nedělám jen nesystémové obcházení problému (tzv. *hack*).',
              'V rámci práce jsem se podílel na **vývoji a údržbě** webových aplikací pro naše klienty.',
              'Měl jsem možnost pracovat na různých projektech, které mi umožnily rozvíjet své dovednosti v oblasti **programování**, **komunikace v týmu**, **organizace práce** a **time managementu**...',
            ],
            references: [
              'Velmi jsi mě překvapil svými znalostmi!',
              'Moc se mi líbí tvůj přístup k práci - i s minimem zkušeností věci zkoušíš, jdeš do nich naplno, jsi Lukášovi **velkou týmovou oporou** a krásně rosteš. A baví mě i naše **mimopracovní hovory**!',
              'Jsi **nadějný** a **talentovaný juniorní vývojář** se zodpovědným přístupem a smyslem pro **efektivitu**.',
              'Máš chuť věci **zkoumat**, **poznávat** a učit se dělat je správně.',
              'Rychle se učíš a těší mě, jak **rozumně používáš AI**. Jsi dostatečně **samostatný**, ale zároveň dokážeš poznat, kdy je čas **se zeptat** někoho **zkušenějšího**.',
              'Díky, že se **každé výzvě** umíš postavit čelem!',
            ],
          },
        ],
      },
    ],
  },
  en: {
    title: 'About Me',
    sections: [
      {
        title: 'Education, work and IT jobs',
        cards: [
          {
            title: 'High school (2020-2024)',
            linkLabel: 'SPŠ Žďár nad Sázavou',
            linkHref: 'https://www.spszr.cz/',
            bullets: [
              'I studied **IT**, focused on **programming** and **network administration**…',
            ],
          },
          {
            title: 'University (2024-202x)',
            linkLabel: 'VUT FIT Brno',
            linkHref: 'https://www.vut.cz',
            bullets: [
              "I'm studying **FIT(IT)**, focused mainly on developing software solutions - from algorithms and data structures, through **artificial intelligence**, to **software engineering**.",
              'The program also covers cybersecurity, embedded systems and IoT, digital signal and image processing, and telecommunication and network technologies...',
            ],
          },
          {
            title:
              'Part-time job at Commity (Jun 1, 2024 - Sep 10, 2024), (Jun 1, 2025 - Sep 15, 2025), (external collaboration during 2026)',
            linkLabel: 'Commity',
            linkHref: 'https://commity.cz',
            bullets: [
              'I worked primarily on the **frontend** of web applications (TSX, **React**).',
              'I also got hands-on experience working with data in **Metabase** (**SQL** queries) and with **APIs** (**REST**, **Postman**).',
              "I tried testing web applications with **Cypress**, both on assignments from the team and on my own initiative - I wanted to know whether things really were supposed to work that way, whether the approach was correct, and that I wasn't just applying an unsystematic workaround (a so-called *hack*).",
              'As part of the job, I contributed to the **development and maintenance** of web applications for our clients.',
              'I had the opportunity to work on various projects that let me develop my skills in **programming**, **team communication**, **work organization**, and **time management**...',
            ],
            references: [
              'You really surprised me with your knowledge!',
              "I really like your approach to work - even with minimal experience you dive right in and give it your all, you're **a great team support** for Lukáš, and you're growing nicely. And I enjoy our **conversations outside of work** too!",
              "You're a **promising** and **talented junior developer** with a responsible attitude and a sense for **efficiency**.",
              'You have a real drive to **explore**, **learn**, and figure out how to do things right.',
              "You learn fast, and I'm glad to see how **sensibly you use AI**. You're **independent** enough, but you also know when it's time to **ask** someone more **experienced**.",
              'Thanks for always being able to face **every challenge** head-on!',
            ],
          },
        ],
      },
    ],
  },
} as const;
