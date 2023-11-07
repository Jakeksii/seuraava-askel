// LIBRARIES
import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ThemeProvider from './Theme'
import MainNav from './assets/components/MainNav'
import { useAppContext } from './assets/context/appContext'

// COMPONENTS
import Footer from './assets/components/Footer'
import Header from './assets/components/Header'
import Loading from './assets/components/partials/Loading'
import Login from './pages/Login'
import Register from './pages/Register'

// PAGES
const ChooseOrganization = lazy(() => import('./pages/Authenticated/ChooseOrganization'))
const CreateOrganization = lazy(() => import('./pages/Authenticated/CreateOrganization'))
const Dasboard = lazy(() => import('./pages/Authenticated/Organization/Dashboard'))
const Events = lazy(() => import('./pages/Authenticated/Organization/Events'))
const Organization = lazy(() => import('./pages/Authenticated/Organization/Organization'))
const Analytics = lazy(() => import('./pages/Authenticated/Organization/Analytics'))
const Subscription = lazy(() => import('./pages/Authenticated/Organization/Subscription'))

const loading = <Loading />

function App() {
  const appContext = useAppContext()
  const isAuthenticated = !!appContext.user

  // If we are not authenticated we have only login and register page available
  return (
    <ThemeProvider>
      <Header text={appContext.organization?.name ?? "Seuraava askel"} />
      <Routes>
        {
          isAuthenticated
            ? (
              <>
                <Route path='/' element={<Suspense fallback={loading}><ChooseOrganization /></Suspense>} />
                <Route path='/create' element={<Suspense fallback={loading}><CreateOrganization /></Suspense>} />
                <Route path='/:organization_id' element={<Suspense fallback={loading}><Dasboard /></Suspense>} />
                <Route path='/:organization_id/events' element={<Suspense fallback={loading}><Events /></Suspense>} />
                <Route path='/:organization_id/organization' element={<Suspense fallback={loading}><Organization /></Suspense>} />
                <Route path='/:organization_id/analytics' element={<Suspense fallback={loading}><Analytics /></Suspense>} />
                <Route path='/:organization_id/subscription' element={<Suspense fallback={loading}><Subscription /></Suspense>} />
                <Route path='*' element={<Navigate to="/" />} />
              </>
            )
            : (
              <>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<Navigate to="/" />} />
              </>
            )
        }
      </Routes>
      {isAuthenticated && <MainNav />}
      <Footer />
    </ThemeProvider>
  )
}
export default App
