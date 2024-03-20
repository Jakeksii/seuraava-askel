import './globals.css'
import Router from './Router'
import ThemeProvider from './theme'
import Nav from './components/Nav'
import { SearchContextProvider } from './context/searchContext'


function App() {
  return (
    <ThemeProvider>
      <SearchContextProvider>
          <Router />
          <Nav />
      </SearchContextProvider>
    </ThemeProvider>
  )
}
export default App
