import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { VerifiedEmailView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifiedEmailPage() {
  return (
    <>
      <Helmet>
        <title> Sähköpostin vahvistus </title>
      </Helmet>

      <ErrorBoundary>
        <VerifiedEmailView />
      </ErrorBoundary>
    </>
  );
}