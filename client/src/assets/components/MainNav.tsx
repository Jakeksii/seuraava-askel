import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, Fab } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function MainNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <div>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={closeDrawer}
      >
        <nav className="h-[100%] bg-secondary-main p-5 flex flex-col justify-center gap-2">
          <Button color='info' variant='contained' fullWidth component={Link} to="/" onClick={closeDrawer}><p>Etusivu</p></Button>
          <Button color='info' variant='contained' fullWidth component={Link} to="/" onClick={closeDrawer}><p>Tykkäämäsi tapahtumat</p></Button>
          <Button color='info' variant='contained' fullWidth component={Link} to="/" onClick={closeDrawer}><p>Meidän tarina</p></Button>
          <br />
          <Button color='info' variant='outlined' fullWidth component={Link} to="/about" onClick={closeDrawer}><p>Ota yhteyttä</p></Button>
          <Button color='info' variant='text' component={Link} to="/" onClick={closeDrawer}><p>Listaa seurakuntasi</p></Button>
        </nav>
      </Drawer>
      <div className='fixed bottom-5 left-5 md:bottom-10 md:left-10'>
        <Fab color='primary' aria-label="menu" onClick={() => setDrawerOpen(true)} >
          <MenuIcon />
        </Fab>
      </div>
    </div>
  )
}