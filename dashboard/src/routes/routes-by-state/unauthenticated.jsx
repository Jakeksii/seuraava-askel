import { lazy } from 'react';

export const LoginPage = lazy(() => import('src/pages/auth/login'));
export const RegisterPage = lazy(() => import('src/pages/auth/register'));
export const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'))

export default [
    { element: <LoginPage />, index: true },
    { path: 'login', element: <LoginPage /> },
    { path: 'register', element: <RegisterPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
]