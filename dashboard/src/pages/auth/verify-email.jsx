import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';

import { VerifyEmailView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifyEmailPage() {
  return (
    <>
      <Helmet>
        <title> Vahvista sähköposti </title>
      </Helmet>

      <ErrorBoundary>
        <VerifyEmailView />
      </ErrorBoundary>
    </>
  );
}