import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { EventsView } from 'src/sections/events/view';

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
    </>
  );
}
