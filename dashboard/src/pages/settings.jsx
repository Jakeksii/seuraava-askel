import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { UserView } from 'src/sections/settings/view';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> Asetukset </title>
      </Helmet>

      <ErrorBoundary>
        <UserView />
      </ErrorBoundary>
    </>
  );
}