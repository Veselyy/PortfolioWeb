import { Fragment } from 'react';
import { Box, Container, Divider } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from './context/ThemeModeProvider';
import { LanguageProvider } from './context/LanguageProvider';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import WorkApproach from './components/WorkApproach';
import Footer from './components/Footer';

const styles = {
  container: {
    width: '95%',
    maxWidth: '1200px',
    marginInline: 'auto',
    paddingBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 4, md: 6 },
  },
  divider: {
    width: '40%',
    mx: 'auto',
    bgcolor: (theme: Theme) => (theme.palette.mode === 'dark' ? 'common.white' : 'common.black'),
  },
  navbar: {
    width: { xs: '100vw', md: 'auto' },
    marginInline: { xs: 'calc(50% - 50vw)', md: 0 },
    paddingTop: { xs: 0, md: '10px' },
  },
} as const;

function App() {
  const sections = [
    { key: 'navbar', node: <Navbar /> },
    { key: 'header', node: <Header /> },
    { key: 'about', node: <AboutMe /> },
    { key: 'projects', node: <Projects /> },
    { key: 'work', node: <WorkApproach /> },
    { key: 'footer', node: <Footer /> },
  ] as const;

  return (
    <LanguageProvider>
      <ThemeModeProvider>
        <CssBaseline enableColorScheme />
        <Container maxWidth={false} sx={styles.container} disableGutters>
          {sections.map((section, idx) => (
            <Fragment key={section.key}>
              {section.key === 'navbar' ? (
                <Box sx={styles.navbar}>{section.node}</Box>
              ) : (
                section.node
              )}
              {idx !== 0 && idx < sections.length - 1 && <Divider sx={styles.divider} />}
            </Fragment>
          ))}
        </Container>
      </ThemeModeProvider>
    </LanguageProvider>
  );
}

export default App;
