import { Helmet } from 'react-helmet-async';

import { ResetPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Salasanan nollaus | SE-AS </title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}