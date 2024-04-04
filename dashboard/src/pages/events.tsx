import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { EventsView } from 'src/sections/events/view';
import NewEventsView from 'src/sections/events/view/new-events-view';

// ----------------------------------------------------------------------

export default function EventsPage() {
  return (
    <>
      <Helmet>
        <title> Tapahtumat </title>
      </Helmet>

      <ErrorBoundary>
        <Routes>
          <Route index element={<EventsView />} />
          <Route path=':id/edit' element={<NewEventsView />} />
          <Route path='new' element={<NewEventsView />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
