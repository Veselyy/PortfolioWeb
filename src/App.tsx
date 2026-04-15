import { Container } from '@mui/material';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from './context/ThemeModeProvider';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth={false}
        sx={{ width: '95%', maxWidth: '1200px', marginInline: 'auto', paddingBlock: '10px' }}
        disableGutters
      >
        <Navbar />
      </Container>
    </ThemeModeProvider>
  );
}

export default App;
