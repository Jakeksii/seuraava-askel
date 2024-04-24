import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <ErrorBoundary>
        <AppView />
      </ErrorBoundary>
    </>
  );
}
