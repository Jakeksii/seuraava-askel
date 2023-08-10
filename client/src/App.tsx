import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainNav from './assets/components/MainNav'
import { useLocationContext } from './assets/context/locationContext'
import EventPage from './pages/Event'
import Home from './pages/Home'
import OrganizationPage from './pages/Organization'

function App() {
  const locationContext = useLocationContext()
  useEffect(() => {
      if (!locationContext.locationOn) locationContext.getLocation()
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:organization_name' element={<OrganizationPage />} />
        <Route path='/:organization_name/:event_id' element={<EventPage />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      <MainNav />
    </>
  )
}
export default App
