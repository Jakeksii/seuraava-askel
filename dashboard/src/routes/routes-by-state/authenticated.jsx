import { lazy } from 'react';

export const VerifyEmailPage = lazy(() => import('src/pages/auth/verify-email'))

// Authenticated but not verified email
export default [
    { element: <VerifyEmailPage />, index: true },
]