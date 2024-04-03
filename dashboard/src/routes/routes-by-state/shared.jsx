// These routes are shared between state
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

export const ResetPasswordPage = lazy(() => import('src/pages/auth/reset-password'))
export const VerifiedEmailPage = lazy(() => import('src/pages/auth/verified-email'))
export const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'))

export default [
    { path: 'verified-email', element: <VerifiedEmailPage /> },
    { path: 'reset-password', element: <ResetPasswordPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
    { path: '*', element: <Navigate to="/" replace /> }
]