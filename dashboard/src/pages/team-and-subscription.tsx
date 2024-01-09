import { Helmet } from 'react-helmet-async';

import { TeamAndSubscriptionView } from 'src/sections/team-and-subscription/view';

// ----------------------------------------------------------------------

export default function TeamAndSubscription() {
  return (
    <>
      <Helmet>
        <title> Tiimi & Tilaus | SE-AS </title>
      </Helmet>
      <TeamAndSubscriptionView />
    </>
  );
}