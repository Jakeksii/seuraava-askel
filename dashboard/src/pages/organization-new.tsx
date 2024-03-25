import { Helmet } from 'react-helmet-async';

import { NewOrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function NewOrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Organisaatio </title>
      </Helmet>
      <NewOrganizationView />
    </>
  );
}
