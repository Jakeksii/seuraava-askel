import CircularProgress from '@mui/material/CircularProgress'
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { LocationContextProvider } from './assets/context/locationContext.tsx'
import { SearchContextProvider } from './assets/context/searchContext.tsx'
import './index.css'
const App = lazy(() => import('./App.tsx'))

const queryClient = new QueryClient()

const loading = (
  <div className='h-[100vh] m-auto flex justify-center items-center text-white'>
    <CircularProgress color="inherit" size={50} />
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <SearchContextProvider>
    <LocationContextProvider>
      <Suspense fallback={loading}><App/></Suspense>
    </LocationContextProvider>
    </SearchContextProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
