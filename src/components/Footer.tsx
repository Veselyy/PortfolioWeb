import { Stack } from '@mui/material';

import { SECTION_IDS } from '../constants/sections';
import { useLanguage } from '../context/useLanguage';
import { FOOTER_CONTENT } from '../data/footerContent';
import PageSection from './common/PageSection';
import ContactForm from './footer/ContactForm';
import ContactList from './footer/ContactList';

const styles = {
  content: {
    gap: { xs: 5, md: 2 },
    flexDirection: { xs: 'column', md: 'row' },
  },
} as const;

/** Contact section at the bottom of the page: contact links beside the contact form. */
function Footer() {
  const { lang } = useLanguage();
  const content = FOOTER_CONTENT[lang];

  return (
    <PageSection id={SECTION_IDS.contact} title={content.title} component="footer">
      <Stack sx={styles.content}>
        <ContactList items={content.contactItems} />
        <ContactForm />
      </Stack>
    </PageSection>
  );
}

export default Footer;
