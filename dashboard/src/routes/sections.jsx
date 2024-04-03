import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useAppContext } from 'src/context/appContext';
import { useGetUser } from 'src/hooks/api-hooks/useAuthenticate';

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

const loading = (<main aria-busy style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }} ><CircularProgress sx={{ alignSelf: 'center' }} /></main>)

export default function Router() {
  const { session, selectedOrganization } = useAppContext()
  const { data: user, isLoading } = useGetUser(session?.token)

  let routes = []

  // Unauthenticated State
  routes = {
    element: (
      <Suspense fallback={loading}>
        <Outlet />
      </Suspense>
    ),
    children: [...unauthenticated, ...shared]
  }

  // Authenticated State
  if (Boolean(user)) {
    routes = {
      element: (
        <Suspense fallback={loading}>
          <Outlet />
        </Suspense>
      ),
      children: [...authenticated, ...shared]
    }
  }

  // Verified email State
  if (Boolean(user && user.verified)) {
    routes = {
      element: (
        <DashboardLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [...verified, ...shared]
    }
  }

  // Selected organization State
  if (Boolean(user && user.verified && selectedOrganization)) {
    routes = {
      element: (
        <DashboardLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [...selected, ...shared]
    }
  }

  return useRoutes([routes])
}
