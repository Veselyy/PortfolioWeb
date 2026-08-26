import { lazy, Suspense } from 'react';
import { Box, Container, Divider } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from './context/ThemeModeProvider';
import { LanguageProvider } from './context/LanguageProvider';
import SkipLink from './components/SkipLink';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Projects from './components/Projects';
import Footer from './components/Footer';

// Both render markdown, so eager imports would pull mui-markdown (~89 kB) into the initial
// bundle for content that starts below the fold. Loading them separately keeps that weight
// off the critical path.
const AboutMe = lazy(() => import('./components/AboutMe'));
const WorkApproach = lazy(() => import('./components/WorkApproach'));

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
  main: {
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
  return (
    <LanguageProvider>
      <ThemeModeProvider>
        <CssBaseline enableColorScheme />
        <SkipLink />
        <Container maxWidth={false} sx={styles.container} disableGutters>
          <Box sx={styles.navbar}>
            <Navbar />
          </Box>
          <Header />
          <Divider sx={styles.divider} />
          <Box component="main" id="main" sx={styles.main}>
            <Suspense fallback={<Box component="section" id="about" aria-hidden="true" />}>
              <AboutMe />
            </Suspense>
            <Divider sx={styles.divider} />
            <Projects />
            <Divider sx={styles.divider} />
            <Suspense fallback={null}>
              <WorkApproach />
            </Suspense>
          </Box>
          <Divider sx={styles.divider} />
          <Footer />
        </Container>
      </ThemeModeProvider>
    </LanguageProvider>
  );
}

export default App;
