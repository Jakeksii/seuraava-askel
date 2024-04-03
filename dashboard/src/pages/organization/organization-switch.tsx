import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { useAppContext } from 'src/context/appContext';
import useCurrentUser from 'src/hooks/api-hooks/useCurrentUser';
import LoadingView from 'src/sections/loading/loading-view';

import { ChangeOrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function ChangeOrganizationPage() {
  // GET CURRENT USER DATA
  const token = useAppContext().session?.token
  const { data } = useCurrentUser({ token })

  return (
    <>
      <Helmet>
        <title> Vaihda organisaatio </title>
      </Helmet>

      <ErrorBoundary>
        {
          data
            ? <ChangeOrganizationView organizations={data.organizations} />
            : <LoadingView />
        }
      </ErrorBoundary>
    </>
  );
}
