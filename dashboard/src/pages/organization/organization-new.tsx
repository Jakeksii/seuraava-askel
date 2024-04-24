import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';

import { NewOrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function NewOrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Uusi organisaatio </title>
      </Helmet>

      <ErrorBoundary>
        <NewOrganizationView />
      </ErrorBoundary>
    </>
  );
}
