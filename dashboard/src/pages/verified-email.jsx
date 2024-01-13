import { Helmet } from 'react-helmet-async';

import { VerifiedEmailView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifiedEmailPage() {
  return (
    <>
      <Helmet>
        <title> Sähköpostin vahvistus | SE-AS </title>
      </Helmet>

      <VerifiedEmailView />
    </>
  );
}