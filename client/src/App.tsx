import { CircularProgress } from '@mui/material'
import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainNav from './assets/components/MainNav'
import { useLocationContext } from './assets/context/locationContext'
const Home = lazy(() => import('./pages/Home'))
const EventPage = lazy(() => import('./pages/Event'))
const OrganizationPage = lazy(() => import('./pages/Organization'))

const loading = (
  <div className='h-[100vh] m-auto flex justify-center items-center text-white'>
    <CircularProgress color="inherit" size={50} />
  </div>
)

function App() {
  const locationContext = useLocationContext()
  useEffect(() => {
      if (!locationContext.locationOn) locationContext.getLocation()
  }, [])
  return (
    <>
      <Routes>
          <Route path='/' element={<Suspense fallback={loading}><Home/></Suspense>} />
          <Route path='/:organization_name' element={<Suspense fallback={loading}><OrganizationPage/></Suspense>} />
          <Route path='/:organization_name/:event_id' element={<Suspense fallback={loading}><EventPage/></Suspense>} />
          <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      <MainNav />
    </>
  )
}
export default App
