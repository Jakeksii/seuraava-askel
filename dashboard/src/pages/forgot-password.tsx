import { Helmet } from 'react-helmet-async';

import { ForgotPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Salasanan nollaus | SE-AS </title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}