import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Drawer, Fab, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';

const containedItems = [
  {
    text: 'Etusivu',
    url: '/',
  },
  {
    text: 'Tykkäämäsi tapahtumat',
    url: '/'
  },
  {
    text: 'Meidän tarina',
    url: '/'
  }
]

const outlinedItems = [
  {
    text: 'Ota yhteyttä',
    url: '/',
  },
  {
    text: 'Listaa tapahtumasi',
    url: '/'
  }
]

export default function Nav() {
  const theme = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={closeDrawer}
        sx={{color: theme.palette.primary.contrastText}}
        PaperProps={{sx: {backgroundColor: theme.palette.secondary.main}}}
      >
        <Box height={'100%'} display={'grid'} justifyItems={'center'}>
          <Typography variant='h1' textAlign={'center'} p={2} color={'whitesmoke'}>NexTep</Typography>
          <Stack component='nav' gap={5} p={2} width={'100%'}>
            <Stack gap={1} alignItems={'center'}>
              {
                containedItems.map((item, i) => (
                  <Button key={i} variant='contained' fullWidth component={Link} to={item.url} onClick={closeDrawer}>{item.text}</Button>
                ))
              }
            </Stack>
            <Stack gap={1} alignItems={'center'}>
              {
                outlinedItems.map((item, i) => (
                  <Button key={i} variant='outlined' fullWidth component={Link} to={item.url} onClick={closeDrawer}>{item.text}</Button>
                ))
              }
            </Stack>
          </Stack>
          <Fab color='primary' aria-label="menu-close" onClick={() => setDrawerOpen(false)} >
            <CloseIcon />
          </Fab>
        </Box>

      </Drawer>
      <Box sx={{ position: 'fixed', bottom: 20, left: 20 }}>
        <Fab color='primary' onClick={() => setDrawerOpen(true)} >
          <MenuIcon />
        </Fab>
      </Box>
    </>
  )
}