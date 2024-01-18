import './App.css'
import Router from './Router'
import ThemeProvider from './Theme'
import MainNav from './assets/components/MainNav'
import { LocationContextProvider } from './assets/context/locationContext'
import { SearchContextProvider } from './assets/context/searchContext'

function App() {
  return (
    <ThemeProvider>
      <SearchContextProvider>
        <LocationContextProvider>
          <Router />
          <MainNav />
        </ LocationContextProvider>
      </ SearchContextProvider>
    </ThemeProvider>
  )
}
export default App
