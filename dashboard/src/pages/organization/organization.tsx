import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { OrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function OrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Organisaatio </title>
      </Helmet>

      <ErrorBoundary>
        <OrganizationView />
      </ErrorBoundary>
    </>
  );
}
