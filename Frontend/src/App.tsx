import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#131921',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
