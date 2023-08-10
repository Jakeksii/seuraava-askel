import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { LocationContextProvider } from './assets/context/locationContext.tsx'
import { SearchContextProvider } from './assets/context/searchContext.tsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <SearchContextProvider>
    <LocationContextProvider>
    <App />
    </LocationContextProvider>
    </SearchContextProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
