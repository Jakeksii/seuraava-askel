import { Helmet } from 'react-helmet-async';

import { OrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function OrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Organisaatio | SE-AS </title>
      </Helmet>
      <OrganizationView />
    </>
  );
}
