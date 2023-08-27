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
        <nav className="h-[100%] bg-primary-main p-5 flex flex-col justify-center gap-2">
          <Button sx={{
                    borderRadius: '10px'
                }}
                color='info' variant='contained' fullWidth component={Link} to="/" onClick={closeDrawer}><h5>Etusivu</h5></Button>
          <Button sx={{
                    borderRadius: '10px'
                }}
                color='info' variant='contained' fullWidth component={Link} to="/" onClick={closeDrawer}><h5>Tykkäämäsi tapahtumat</h5></Button>
          <Button sx={{
                    borderRadius: '10px'
                }}
                color='info' variant='contained' fullWidth component={Link} to="/" onClick={closeDrawer}><h5>Meidän tarina</h5></Button>
          <br />
          <Button sx={{
                    borderRadius: '10px'
                }}
                color='info' variant='outlined' fullWidth component={Link} to="/about" onClick={closeDrawer}><h6>Ota yhteyttä</h6></Button>
          <Button sx={{
                    borderRadius: '10px'
                }}
                color='info' variant='outlined' component={Link} to="/" onClick={closeDrawer}><h6>Listaa seurakuntasi</h6></Button>
        </nav>
      </Drawer>
      <div className='fixed bottom-5 left-5 md:bottom-10 md:left-10'>
        <Fab color='primary' aria-label="menu" onClick={() => setDrawerOpen(true)} >
          <MenuIcon color='info'/>
        </Fab>
      </div>
    </div>
  )
}