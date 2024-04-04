import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// Layout
import DashboardLayout from 'src/layouts/dashboard';

// Routes by state
import unauthenticated from './routes-by-state/unauthenticated';
import authenticated from './routes-by-state/authenticated';
import verified from './routes-by-state/verified';
import selected from './routes-by-state/selected';

// Shared routes
import shared from './routes-by-state/shared';

// ----------------------------------------------------------------------

const loading = (
  <main aria-busy style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }}>
    <CircularProgress sx={{ alignSelf: 'center' }} />
  </main>
);

export default function Sections({user, selectedOrganization}) {

  const routes = [
    {
      element: (
        <Suspense fallback={loading}>
          <Outlet />
        </Suspense>
      ),
      children: [...unauthenticated, ...shared]
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [...authenticated, ...shared]
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [...verified, ...shared]
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [...selected, ...shared]
    }
  ];

  const userAuthenticated = Boolean(user);
  const userVerified = Boolean(user && user.verified);
  const organizationSelected = Boolean(user && user.verified && selectedOrganization);

  let index = 0;
  if (userAuthenticated) index = 1;
  if (userVerified) index = 2;
  if (organizationSelected) index = 3;

  return useRoutes([routes.at(index)]);
}
