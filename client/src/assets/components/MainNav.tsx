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
        
        <div className="h-[100%] bg-secondary-main p-5 flex flex-col justify-center">
          <Button color='primary' variant='contained' fullWidth component={Link} to="/" aria-label='navigate to home' onClick={closeDrawer}><h4>Tapahtumat</h4></Button>
        </div>
      </Drawer>
      <div className='fixed bottom-5 left-5 md:bottom-10 md:left-10'>
      <Fab color='primary' aria-label="menu" onClick={() => setDrawerOpen(true)} >
        <MenuIcon />
      </Fab>
      </div>
    </div>
  )
}