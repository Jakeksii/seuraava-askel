import { Helmet } from 'react-helmet-async';

import { ChangeOrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function ChangeOrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Organisaatio | SE-AS </title>
      </Helmet>
      <ChangeOrganizationView />
    </>
  );
}
