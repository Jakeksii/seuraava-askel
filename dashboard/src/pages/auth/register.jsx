import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { RegisterView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Rekisteröidy </title>
      </Helmet>

      <ErrorBoundary>
        <RegisterView />
      </ErrorBoundary>
    </>
  );
}