import { CircularProgress } from '@mui/material'
import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ThemeProvider from './Theme'
import MainNav from './assets/components/MainNav'
import { useAppContext } from './assets/context/appContext'


// Pages
import Login from './pages/Login'
const Register = lazy(() => import('./pages/Register'))
const ChooseOrganization = lazy(() => import('./pages/ChooseOrganization'))
const CreateOrganization = lazy(() => import('./pages/CreateOrganization'))
const Dasboard = lazy(() => import('./pages/Dashboard'))
const CreateEvent = lazy(() => import('./pages/CreateEvent'))
// Banjo added ^
const Events = lazy(() => import('./pages/Events'))
const Event = lazy(() => import('./pages/Event'))
const Organization = lazy(() => import('./pages/Organization'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Subscription = lazy(() => import('./pages/Subscription'))

const loading = (
  <div className='h-[100vh] m-auto flex justify-center items-center text-white'>
    <CircularProgress color="inherit" size={50} />
  </div>
)

function App() {
  const appContext = useAppContext()
  const isAuthenticated = appContext.user ? true : false

  // If we are not authenticated we have only login and register page available
  return (
    <ThemeProvider>
      <Routes>
        {
          isAuthenticated
            ? (
              <>
                <Route path='/' element={<Suspense fallback={loading}><ChooseOrganization /></Suspense>} />
                <Route path='/create' element={<Suspense fallback={loading}><CreateOrganization /></Suspense>} />
                <Route path='/:organization_id' element={<Suspense fallback={loading}><Dasboard /></Suspense>} />
                <Route path='/:organization_id/events' element={<Suspense fallback={loading}><Events /></Suspense>} />
                <Route path='/:organization_id/events/create-event' element={<Suspense fallback={loading}><CreateEvent /></Suspense>} />
                {/* Banjo added ^ */}
                <Route path='/:organization_id/events/:event_id' element={<Suspense fallback={loading}><Event /></Suspense>} />
                <Route path='/:organization_id/organization' element={<Suspense fallback={loading}><Organization /></Suspense>} />
                <Route path='/:organization_id/analytics' element={<Suspense fallback={loading}><Analytics /></Suspense>} />
                <Route path='/:organization_id/subscription' element={<Suspense fallback={loading}><Subscription /></Suspense>} />
                <Route path='*' element={<Navigate to="/" />} />
              </>
            )
            : (
              <>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Suspense fallback={loading}><Register /></Suspense>} />
                <Route path='*' element={<Navigate to="/" />} />
              </>
            )
        }
      </Routes>
      {isAuthenticated && <MainNav />}
    </ThemeProvider>
  )
}
export default App
