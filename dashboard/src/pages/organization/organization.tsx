import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';

import { ChangeOrganizationView, NewOrganizationView, OrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function OrganizationPage() {
  return (
    <>
      <Helmet>
        <title> Organisaatio </title>
      </Helmet>

      <ErrorBoundary>
        <Routes>
          <Route index element={<OrganizationView />} />
          <Route path='new' element={<NewOrganizationView />} />
          <Route path='switch' element={<ChangeOrganizationView />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
