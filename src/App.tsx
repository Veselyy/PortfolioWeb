import { Container } from '@mui/material';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth={false}
        sx={{ width: '95%', maxWidth: '1200px', marginInline: 'auto' }}
        disableGutters
      ></Container>
    </ThemeProvider>
  );
}

export default App;
