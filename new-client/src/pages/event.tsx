import { Helmet } from 'react-helmet-async';

import { EventView } from 'src/sections/event/view';

// ----------------------------------------------------------------------

export default function EventPage() {
  return (
    <>
      <Helmet>
        <title> Tapahtuma | SE-AS </title>
      </Helmet>
      <EventView />
    </>
  );
}
