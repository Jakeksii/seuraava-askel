import { Helmet } from 'react-helmet-async';

import { EventsView } from 'src/sections/events/feed';

// ----------------------------------------------------------------------

export default function EventsPage() {
  return (
    <>
      <Helmet>
        <title> Tapahtumat | SE-AS </title>
      </Helmet>
      <EventsView />
    </>
  );
}
