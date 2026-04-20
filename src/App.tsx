import { Fragment } from 'react';
import { Container, Divider } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from './context/ThemeModeProvider';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Footer from './components/Footer';

const styles = {
  container: {
    width: '95%',
    maxWidth: '1200px',
    marginInline: 'auto',
    paddingBlock: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  divider: {
    width: '40%',
    mx: 'auto',
    bgcolor: (theme: Theme) => (theme.palette.mode === 'dark' ? 'common.white' : 'common.black'),
  },
} as const;

function App() {
  const sections = [
    { key: 'navbar', node: <Navbar /> },
    { key: 'header', node: <Header /> },
    { key: 'about', node: <AboutMe /> },
    { key: 'projects', node: <Projects /> },
    { key: 'footer', node: <Footer /> },
  ] as const;

  return (
    <ThemeModeProvider>
      <CssBaseline enableColorScheme />
      <Container maxWidth={false} sx={styles.container} disableGutters>
        {sections.map((section, idx) => (
          <Fragment key={section.key}>
            {section.node}
            {idx !== 0 && idx < sections.length - 1 && <Divider sx={styles.divider} />}
          </Fragment>
        ))}
      </Container>
    </ThemeModeProvider>
  );
}

export default App;
