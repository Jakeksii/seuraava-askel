import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, Fab } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

export default function MainNav() {

  const appContext = useAppContext()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const loggedInNav = (
    <nav className="h-[100%] bg-secondary-main p-5 flex flex-col justify-center gap-2">
      <Button color='info' variant='contained' fullWidth component={Link} to="/dashboard/create" onClick={closeDrawer}><h4>Omat tapahtumat</h4></Button>
      <Button color='info' variant='contained' fullWidth component={Link} to="/dashboard/create" onClick={closeDrawer}><h4>Muokkaa seurakuntaa</h4></Button>
      <br />
      <Button color='info' variant='contained' fullWidth component={Link} to="/dashboard/create" onClick={closeDrawer}><p>Vaihda seurakuntaasi</p></Button>
      <div className='flex gap-2 justify-between'>
      <Button color='info' variant='contained' component={Link} to="/" onClick={closeDrawer}><p>Etusivulle</p></Button>
      <Button color='info' variant='contained' component={Link} to="/" onClick={() => {appContext.logOut(); closeDrawer()} }><p>Kirjaudu ulos</p></Button>
      </div>
      
    </nav>
  )
  const loggedOutNav = (
    <nav className="h-[100%] bg-secondary-main p-5 flex flex-col justify-center gap-2">
          <Button color='primary' variant='contained' fullWidth component={Link} to="/" onClick={closeDrawer}><h4>Tapahtumat</h4></Button>
          <Button color='info' variant='contained' fullWidth component={Link} to="/dashboard/create" onClick={closeDrawer}><h4>Listaa seurakuntasi</h4></Button>
          <br/>
          <Button color='info' variant='text' fullWidth component={Link} to="/login" onClick={closeDrawer}><p>Kirjaudu sisään</p></Button>
          <Button color='info' variant='text' fullWidth component={Link} to="/register" onClick={closeDrawer}><p>Rekisteröidy</p></Button>
        </nav>
  )

  return (
    <div>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={closeDrawer}
      >
        {
          appContext.user ? loggedInNav : loggedOutNav
        }
      </Drawer>
      <div className='fixed bottom-5 left-5 md:bottom-10 md:left-10'>
        <Fab color='primary' aria-label="menu" onClick={() => setDrawerOpen(true)} >
          <MenuIcon />
        </Fab>
      </div>
    </div>
  )
}