import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/Error/ErrorBoundary';

import { TeamAndSubscriptionView } from 'src/sections/team-and-subscription/view';

// ----------------------------------------------------------------------

export default function TeamAndSubscription() {
  return (
    <>
      <Helmet>
        <title> Tiimi & Tilaus </title>
      </Helmet>

      <ErrorBoundary>
        <TeamAndSubscriptionView />
      </ErrorBoundary>
    </>
  );
}