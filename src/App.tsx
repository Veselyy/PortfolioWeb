import { Container, Divider } from '@mui/material';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from './context/ThemeModeProvider';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutMe from './components/AboutMe';

const styles = {
  container: {
    width: '95%',
    maxWidth: '1200px',
    marginInline: 'auto',
    paddingBlock: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  divider: {
    width: '40%',
    mx: 'auto',
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'common.white' : 'common.black'),
  },
} as const;

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline enableColorScheme />
      <Container maxWidth={false} sx={styles.container} disableGutters>
        <Navbar />
        <Header />
        <Divider sx={styles.divider} />
        <AboutMe />
      </Container>
    </ThemeModeProvider>
  );
}

export default App;
