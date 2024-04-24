import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';

import { LoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Kirjaudu </title>
      </Helmet>

      <ErrorBoundary>
        <LoginView />
      </ErrorBoundary>
    </>
  );
}