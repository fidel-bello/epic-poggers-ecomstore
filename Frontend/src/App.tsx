import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavBar } from './components/NavBar';
import Home from './pages/Home';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#FEF200',
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
