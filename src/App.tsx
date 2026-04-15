import { Container } from '@mui/material';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from './context/ThemeModeProvider';
import Navbar from './components/Navbar';
import Header from './components/Header';

const containerSx = {
  width: '95%',
  maxWidth: '1200px',
  marginInline: 'auto',
  paddingBlock: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
} as const;

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline enableColorScheme />
      <Container maxWidth={false} sx={containerSx} disableGutters>
        <Navbar />
        <Header />
      </Container>
    </ThemeModeProvider>
  );
}

export default App;
