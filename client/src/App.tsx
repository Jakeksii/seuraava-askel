import { CircularProgress } from '@mui/material'
import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ThemeProvider from './Theme'
import MainNav from './assets/components/MainNav'
import { LocationContextProvider } from './assets/context/locationContext'
import { SearchContextProvider } from './assets/context/searchContext'
import Home from './pages/Home'
const EventPage = lazy(() => import('./pages/Event/Event'))
const OrganizationPage = lazy(() => import('./pages/Organization'))

const loading = (
  <div className='h-[100vh] m-auto flex justify-center items-center text-white'>
    <CircularProgress color="inherit" size={50} />
  </div>
)

function App() {
  return (
    <ThemeProvider>
      <SearchContextProvider>
        <LocationContextProvider>
          <Routes>
            <Route path='/' element={<Suspense fallback={loading}><Home /></Suspense>} />
            <Route path='/:organization_name' element={<Suspense fallback={loading}><OrganizationPage /></Suspense>} />
            <Route path='/:organization_name/:event_id' element={<Suspense fallback={loading}><EventPage /></Suspense>} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
          <MainNav />
        </ LocationContextProvider>
      </ SearchContextProvider>
    </ThemeProvider>
  )
}
export default App
