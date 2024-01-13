import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useAppContext } from 'src/context/appContext';
import { useGetUser } from 'src/hooks/api-hooks/useAuthenticate';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));

export const ChangeOrganizationPage = lazy(() => import('src/pages/change-organization'))
export const EventsPage = lazy(() => import('src/pages/events'));
export const OrganizationPage = lazy(() => import('src/pages/organization'));
export const StatisticsPage = lazy(() => import('src/pages/statistics'));
export const TeamAndSubscriptionPage = lazy(() => import('src/pages/team-and-subscription'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgot-password'))
export const ResetPasswordPage = lazy(() => import('src/pages/reset-password'))
export const VerifyEmailPage = lazy(() => import('src/pages/verify-email'))
export const VerifiedEmailPage = lazy(() => import('src/pages/verified-email'))
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const SettingsPage = lazy(() => import('src/pages/settings'));
// ----------------------------------------------------------------------

const loading = (<main aria-busy style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }} ><CircularProgress sx={{ alignSelf: 'center' }} /></main>)

export default function Router() {
  const { session } = useAppContext()
  const { data: user, isLoading } = useGetUser(session?.token)

  const routes = useRoutes([
    ...getRoutes(),

    // Common routes these are shared between states
    { path: 'verified-email',element: <Suspense fallback={loading}><VerifiedEmailPage /></Suspense> },
    { path: 'reset-password', element: <Suspense fallback={loading}><ResetPasswordPage /></Suspense> },

    // Catch all routes
    { path: '*',element: <Navigate to="/" replace />}
  ]);

  if (isLoading) return loading

  function getRoutes() {
    if (user) {
      // we have user lets test if user is verified
      if(user.verified) {
        // return authenticated and verified routes
        return [{
          element: (
            <DashboardLayout>
              <Suspense fallback={loading}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            { element: <IndexPage />, index: true },
            { path: 'change-organization', element: <ChangeOrganizationPage /> },
            { path: 'events', element: <EventsPage /> },
            { path: 'organization', element: <OrganizationPage /> },
            { path: 'statistics', element: <StatisticsPage /> },
            { path: 'team&subscription', element: <TeamAndSubscriptionPage /> },
            { path: 'settings', element: <SettingsPage /> }
          ]
        }]

      } else {
        // return authenticated but not verified routes
        return [
          { element: <Suspense fallback={loading}><VerifyEmailPage /></Suspense>, index: true }
        ]
      }
      
    } else {
      // We dont have user
      // return unauthenticated routes
      return [
        { element: <Suspense fallback={loading}><LoginPage /></Suspense>, index: true },
        { path: 'login', element: <Suspense fallback={loading}><LoginPage /></Suspense> },
        { path: 'register', element: <Suspense fallback={loading}><RegisterPage /></Suspense> },
        { path: 'forgot-password', element: <Suspense fallback={loading}><ForgotPasswordPage /></Suspense> },
      ]
    }
  }

  return routes;
}
