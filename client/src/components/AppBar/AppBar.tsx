import TuneIcon from '@mui/icons-material/Tune';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import Filters from '../Filters/Filters';
import LocationButton from './LocationButton';
import Search from './Search';
import { useIsTiny } from 'src/hooks/useResponsive';

export default function AppBar() {
    const isTiny = useIsTiny()
    const padding = isTiny ? 0.5 : 1

    // Filter panel
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    function openFilterPanel() {
        setFilterPanelOpen(true)
    }
    function closeFilterPanel() {
        setFilterPanelOpen(false)
    }

    return (
        <>
            <Stack direction='row' width='100%' gap={padding} sx={{ pl: padding, pr: padding, scrollMarginTop: 5, pt: 1 }} id='AppBar'>
                <Search />
                <LocationButton />
                <Button // FILTER BUTTON
                    aria-label="Filter events"
                    variant="contained"
                    color='primary'
                    sx={{minWidth: '50px'}}
                    onClick={openFilterPanel}>
                    <TuneIcon />
                </Button>
            </Stack>
            <Filters open={filterPanelOpen} close={closeFilterPanel}/>
        </>
    )
}