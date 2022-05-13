import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#131921',
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
