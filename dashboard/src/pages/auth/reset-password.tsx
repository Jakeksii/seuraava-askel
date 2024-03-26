import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { ResetPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Salasanan nollaus </title>
      </Helmet>

      <ErrorBoundary>
        <ResetPasswordView />
      </ErrorBoundary>
    </>
  );
}