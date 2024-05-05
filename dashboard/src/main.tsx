import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { ErrorBoundary } from './components/Error/ErrorBoundary';

// ----------------------------------------------------------------------



const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense>
          <App />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </HelmetProvider>
);
