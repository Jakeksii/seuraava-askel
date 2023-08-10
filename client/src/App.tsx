import { useEffect, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useLocationContext } from './assets/context/locationContext'
import MainNav from './assets/components/MainNav'
const Home = lazy(() => import('./pages/Home'))
const EventPage = lazy(() => import('./pages/Event'))
const OrganizationPage = lazy(() => import('./pages/Organization'))


function App() {
  const locationContext = useLocationContext()
  useEffect(() => {
      if (!locationContext.locationOn) locationContext.getLocation()
  }, [])
  return (
    <>
      <Routes>
        <Suspense>
          <Route path='/' element={<Home />} />
          <Route path='/:organization_name' element={<OrganizationPage />} />
          <Route path='/:organization_name/:event_id' element={<EventPage />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Suspense>
      </Routes>
      <MainNav />
    </>
  )
}
export default App
