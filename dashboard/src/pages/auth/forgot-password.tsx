import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { ForgotPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Salasanan nollaus </title>
      </Helmet>
      <ErrorBoundary>
        <ForgotPasswordView />
      </ErrorBoundary>
    </>
  );
}