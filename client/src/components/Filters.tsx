import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Fab, Typography, useTheme } from "@mui/material";

type Props = {
    open: boolean
    close: () => void
}

export default function Filters({open, close}: Props) {
    const theme = useTheme()
    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={close}
        >
            <Box height={'100%'} display={'grid'} justifyItems={'center'} sx={{ background: theme.palette.secondary.light }}>
                <Typography variant='h1' textAlign={'center'} p={2} color={'whitesmoke'}>Seuraava<br />Askel</Typography>
                <Typography variant='body1' textAlign={'center'} p={2} color={'whitesmoke'}>Mieltymykset tekeillä</Typography>
                <Fab color='primary' aria-label="menu-close" onClick={close} >
                    <CloseIcon />
                </Fab>
            </Box>
        </Drawer>
    )
}