import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { EditEventView, EventView, EventsView, NewEventView } from 'src/sections/events/view';

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
          <Route path='new' element={<NewEventView />} />
          <Route path=':_id' element={<EventView />} />
          <Route path=':_id/edit' element={<EditEventView />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
