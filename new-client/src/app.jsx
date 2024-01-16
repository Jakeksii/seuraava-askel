import ThemeProvider from 'src/theme';
import 'src/global.css';

import { QueryClient, QueryClientProvider } from 'react-query'

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';

import ColorModeContextProvider from './context/colormode-context';
import { AppContextProvider } from './context/appContext';

// ----------------------------------------------------------------------

const queryClient = new QueryClient()

export default function App() {
  useScrollToTop();

  return (
    <ColorModeContextProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <Router />
          </AppContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContextProvider>
  );
}
