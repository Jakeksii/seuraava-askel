import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ChangeOrganizationPage = lazy(() => import('src/pages/event'))

// ----------------------------------------------------------------------

const loading = (<main aria-busy style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }} ><CircularProgress sx={{ alignSelf: 'center' }} /></main>)

export default function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'event', element: <ChangeOrganizationPage /> },
      ]
    },

    // Catch all routes
    { path: '*', element: <Navigate to="/" replace /> }
  ]);
}
