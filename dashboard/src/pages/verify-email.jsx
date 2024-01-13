import { Helmet } from 'react-helmet-async';

import { VerifyEmailView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifyEmailPage() {
  return (
    <>
      <Helmet>
        <title> Vahvista sähköposti | SE-AS </title>
      </Helmet>

      <VerifyEmailView />
    </>
  );
}