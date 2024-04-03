// Verified email state routes

import { lazy } from 'react';

export const SwitchOrganizationPage = lazy(() => import('src/pages/organization/organization-switch'))
export const NewOrganizationPage = lazy(() => import('src/pages/organization/organization-new'))
export const SettingsPage = lazy(() => import('src/pages/settings'))

export default [
    { element: <SwitchOrganizationPage />, index: true },
    { path: 'organization/new', element: <NewOrganizationPage /> },
    { path: 'settings', element: <SettingsPage /> },
]