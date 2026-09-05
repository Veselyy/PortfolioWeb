// Two variants, switched by VITE_IS_OPEN_TO_WORK (see headerContent.ts for the matching header
// copy): "jobHunting" pitches for the default frontend role, "portfolio" presents the site as a
// plain online portfolio. Baked into index.html at build time (see vite.config.ts) since OG/Twitter
// crawlers and the JSON-LD script don't execute the client-side JS that updates title/description.
export const SEO_CONTENT = {
  cs: {
    jobHunting: {
      title: 'Martin Veselý — Junior Frontend Developer (React/TypeScript)',
      description:
        'Portfolio Martina Veselého, juniorního frontend developera z Brna. React, TypeScript — weby na míru s důrazem na moderní UI a přístupnost.',
      ogTitle: 'Martin Veselý — Junior Frontend Developer',
      ogDescription: 'Weby na míru, moderní UI, spolehlivě. Podívejte se na projekty a ozvěte se.',
      ogImage: 'https://martinvesely.netlify.app/og.png',
      jobTitle: 'Junior Frontend Developer',
    },
    portfolio: {
      title: 'Martin Veselý — vývoj, testování a nasazení webů',
      description:
        'Online portfolio Martina Veselého z Brna — vyvíjím weby od prvního nápadu až po spuštění. React, TypeScript, testování a nasazení do provozu.',
      ogTitle: 'Martin Veselý — vývoj, testování a nasazení webů',
      ogDescription: 'Vyvíjím weby od prvního nápadu až po spuštění. Podívejte se na projekty.',
      ogImage: 'https://martinvesely.netlify.app/og-portfolio.png',
    },
  },
  en: {
    jobHunting: {
      title: 'Martin Veselý — Junior Frontend Developer (React/TypeScript)',
      description:
        'Portfolio of Martin Veselý, a junior frontend developer from Brno. React, TypeScript — custom-built websites with a focus on modern UI and accessibility.',
      ogTitle: 'Martin Veselý — Junior Frontend Developer',
      ogDescription:
        'Custom-built websites, modern UI, built to last. Check out the projects and get in touch.',
      ogImage: 'https://martinvesely.netlify.app/og.png',
      jobTitle: 'Junior Frontend Developer',
    },
    portfolio: {
      title: 'Martin Veselý — web development, testing & deployment',
      description:
        'Online portfolio of Martin Veselý from Brno — building websites from the first idea to launch. React, TypeScript, testing and deployment to production.',
      ogTitle: 'Martin Veselý — web development, testing & deployment',
      ogDescription: 'Building websites from the first idea to launch. Check out the projects.',
      ogImage: 'https://martinvesely.netlify.app/og-portfolio.png',
    },
  },
} as const;

export type SeoVariant = keyof (typeof SEO_CONTENT)['cs'];
