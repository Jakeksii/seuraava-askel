import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fi from 'date-fns/locale/fi';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'src/global.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/router';
import ThemeProvider from 'src/theme';
import { AppContextProvider } from './context/appContext';
import ColorModeContextProvider from './context/colormode-context';

// ----------------------------------------------------------------------

const queryClient = new QueryClient()

export default function App() {
  useScrollToTop();

  return (
    <ColorModeContextProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AppContextProvider>
              <Router />
            </AppContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContextProvider>
  );
}
