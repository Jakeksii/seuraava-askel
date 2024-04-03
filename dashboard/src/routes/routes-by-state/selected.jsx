import { lazy } from 'react';

export const IndexPage = lazy(() => import('src/pages/app'))
export const SwitchOrganizationPage = lazy(() => import('src/pages/organization/organization-switch'))
export const NewOrganizationPage = lazy(() => import('src/pages/organization/organization-new'))
export const EventsPage = lazy(() => import('src/pages/events/events'))
export const OrganizationPage = lazy(() => import('src/pages/organization/organization'))
export const StatisticsPage = lazy(() => import('src/pages/statistics/statistics'))
export const TeamAndSubscriptionPage = lazy(() => import('src/pages/team-and-subscription/team-and-subscription'))
export const MediaPage = lazy(() => import('src/pages/media/media'))
export const SettingsPage = lazy(() => import('src/pages/settings'))

// EXPORT ROUTES
export default [
    { element: <IndexPage/>, index: true },
    { path: 'organization/new', element: <NewOrganizationPage /> },
    { path: 'organization/switch', element: <SwitchOrganizationPage /> },
    { path: 'organization', element: <OrganizationPage /> },
    { path: 'events', element: <EventsPage /> },
    { path: 'media', element: <MediaPage /> },
    { path: 'statistics', element: <StatisticsPage /> },
    { path: 'team&subscription', element: <TeamAndSubscriptionPage /> },
    { path: 'settings', element: <SettingsPage /> }
]