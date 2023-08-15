import { CircularProgress } from '@mui/material'
import { ReactNode, Suspense, lazy } from 'react'
import { Navigate, Route, Routes, redirect, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import ThemeProvider from './Theme'
import MainNav from './assets/components/MainNav'
import { useAppContext, AppContextProvider } from './assets/context/appContext'
const Home = lazy(() => import('./pages/Home'))
const EventPage = lazy(() => import('./pages/Event'))
const OrganizationPage = lazy(() => import('./pages/Organization'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dasboard = lazy(() => import('./pages/Dashboard'))
const CreateOrganization = lazy(() => import('./pages/CreateOrganization'))

const loading = (
  <div className='h-[100vh] m-auto flex justify-center items-center text-white'>
    <CircularProgress color="inherit" size={50} />
  </div>
)
type ProtectedRouteType = {
  isAuthenticated: boolean
  children: ReactNode | ReactNode[]
}
const ProtectedRoute = (props: ProtectedRouteType) => {
  const location = useLocation()
  if (!props.isAuthenticated) {
    return <Navigate to="/login" replace state={{from: location}} />;
  }
  return props.children;
};

function App() {
  const appContext = useAppContext()
  const isAuthenticated = appContext.user ? true : false

  return (
    <ThemeProvider>
      <Routes>
        <Route path='/' element={<Suspense fallback={loading}><Home /></Suspense>} />
        <Route path='/dashboard/create' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Suspense fallback={loading}><CreateOrganization /></Suspense>
          </ProtectedRoute>
        } />
        <Route path='/dashboard/*' element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Suspense fallback={loading}><Dasboard /></Suspense>
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Suspense fallback={loading}><Login /></Suspense>} />
        <Route path='/register' element={<Suspense fallback={loading}><Register /></Suspense>} />
        <Route path='/:organization_name' element={<Suspense fallback={loading}><OrganizationPage /></Suspense>} />
        <Route path='/:organization_name/:event_id' element={<Suspense fallback={loading}><EventPage /></Suspense>} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      <MainNav />
    </ThemeProvider>
  )
}
export default App
