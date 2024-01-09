import { Helmet } from 'react-helmet-async';

import { OrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function ChooseOrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Organization | SE-AS </title>
      </Helmet>
      <OrganizationView />
    </>
  );
}
