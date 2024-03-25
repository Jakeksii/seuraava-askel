import { Helmet } from 'react-helmet-async';

import { OrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function OrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Organisaatio </title>
      </Helmet>
      <OrganizationView />
    </>
  );
}
