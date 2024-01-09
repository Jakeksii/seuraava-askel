import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Rekisteröidy | SE-AS </title>
      </Helmet>

      <RegisterView />
    </>
  );
}