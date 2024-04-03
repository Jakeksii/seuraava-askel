import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { EventsView } from 'src/sections/events/view';
import OrganizationPage from '../organization/organization';

// ----------------------------------------------------------------------

export default function EventsPage() {
  return (
    <>
      <Helmet>
        <title> Tapahtumat </title>
      </Helmet>
      
      <ErrorBoundary>
        <EventsView />
      </ErrorBoundary>
      
      <Routes>
        <Route path='new' element={<OrganizationPage/>}/>
      </Routes>
    </>
  );
}
