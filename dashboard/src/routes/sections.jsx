import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useAppContext } from 'src/context/appContext';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ChangeOrganizationPage = lazy(() => import('src/pages/change-organization'))
export const EventsPage = lazy(() => import('src/pages/events'));
export const OrganizationPage = lazy(() => import('src/pages/organization'));
export const StatisticsPage = lazy(() => import('src/pages/statistics'));
export const TeamAndSubscriptionPage = lazy(() => import('src/pages/team-and-subscription'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const UserPage = lazy(() => import('src/pages/user'));
// ----------------------------------------------------------------------

export default function Router() {
  const { session } = useAppContext()

  // USE THIS WHEN CHANGE ORGANIZATION FUNCTIONALITY IS MADE
  // const pages = session.organization ? ([
  //   { element: <IndexPage />, index: true },
  //   { path: 'change-organization', element: <ChangeOrganizationPage /> },
  //   { path: 'events', element: <UserPage /> },
  //   { path: 'organization', element: <UserPage /> },
  //   { path: 'statistics', element: <ProductsPage /> },
  //   { path: 'team&subscription', element: <BlogPage /> }
  // ]) : ([
  //   { element: <ChangeOrganizationPage />, index: true },
  //   { path: 'change-organization', element: <ChangeOrganizationPage /> }
  // ])

  const pages = [
    { element: <IndexPage />, index: true },
    { path: 'change-organization', element: <ChangeOrganizationPage /> },
    { path: 'events', element: <EventsPage /> },
    { path: 'organization', element: <OrganizationPage /> },
    { path: 'statistics', element: <StatisticsPage /> },
    { path: 'team&subscription', element: <TeamAndSubscriptionPage /> },
    { path: 'settings', element: <UserPage /> }
  ]

  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    session ? {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: pages
    } : {
      path: '*', element: <Navigate to="/login" />
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
