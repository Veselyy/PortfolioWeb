import { Stack } from '@mui/material';

import { SECTION_IDS } from '../constants/sections';
import { useLanguage } from '../context/useLanguage';
import { PROJECTS_CONTENT } from '../data/projectsContent';
import PageSection from './common/PageSection';
import MoreProjectsCta from './projects/MoreProjectsCta';
import ProjectCard from './projects/ProjectCard';

function Projects() {
  const { lang } = useLanguage();
  const content = PROJECTS_CONTENT[lang];

  return (
    <PageSection id={SECTION_IDS.projects} title={content.title}>
      <Stack spacing={3}>
        {content.cards.map((card) => (
          <ProjectCard key={card.title} card={card} />
        ))}
        <MoreProjectsCta
          text={content.moreProjectsCta.text}
          linkLabel={content.moreProjectsCta.linkLabel}
        />
      </Stack>
    </PageSection>
  );
}

export default Projects;
