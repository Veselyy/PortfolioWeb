import { SECTION_IDS } from '../constants/sections';
import { useLanguage } from '../context/useLanguage';
import { ABOUT_ME_CONTENT } from '../data/aboutMeContent';
import { ABOUT_ME_MARKDOWN } from '../data/aboutMeMarkdown';
import AboutMeDetails from './aboutMe/AboutMeDetails';
import AboutMeIntro from './aboutMe/AboutMeIntro';
import { getEducationSection } from './aboutMe/education';
import EducationSection from './aboutMe/EducationSection';
import { splitIntroFromMarkdown } from './aboutMe/splitIntroFromMarkdown';
import PageSection from './common/PageSection';

function AboutMe() {
  const { lang } = useLanguage();
  const { intro, rest } = splitIntroFromMarkdown(ABOUT_ME_MARKDOWN[lang]);
  const educationSection = getEducationSection(lang);

  return (
    <PageSection id={SECTION_IDS.about} title={ABOUT_ME_CONTENT[lang].title}>
      <AboutMeIntro markdown={intro} />
      <AboutMeDetails markdown={rest} />
      {educationSection && <EducationSection section={educationSection} />}
    </PageSection>
  );
}

export default AboutMe;
