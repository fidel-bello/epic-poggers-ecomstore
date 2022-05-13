import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { NavBar } from './components';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FEF200',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
    </ThemeProvider>
  );
}

export default App;
