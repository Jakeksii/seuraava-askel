// Routes for state: selected organization

import { lazy } from 'react';

export const IndexPage = lazy(() => import('src/pages/app'))
export const EventsPage = lazy(() => import('src/pages/events'))
export const OrganizationPage = lazy(() => import('src/pages/organization/organization'))
export const StatisticsPage = lazy(() => import('src/pages/statistics'))
export const TeamAndSubscriptionPage = lazy(() => import('src/pages/team-and-subscription'))
export const MediaPage = lazy(() => import('src/pages/media'))
export const SettingsPage = lazy(() => import('src/pages/settings'))

// EXPORT ROUTES
export default [
    { element: <IndexPage/>, index: true },
    { path: 'organization/*', element: <OrganizationPage /> },
    { path: 'events/*', element: <EventsPage /> },
    { path: 'media', element: <MediaPage /> },
    { path: 'statistics', element: <StatisticsPage /> },
    { path: 'team&subscription', element: <TeamAndSubscriptionPage /> },
    { path: 'settings', element: <SettingsPage /> }
]