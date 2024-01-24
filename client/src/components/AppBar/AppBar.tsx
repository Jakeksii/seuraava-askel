import TuneIcon from '@mui/icons-material/Tune';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import Filters from '../Filters';
import LocationButton from './LocationButton';
import Search from './Search';

export default function AppBar() {
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
            <Stack direction='row' width='100%' gap={1} sx={{ pl: 1, pr: 1, scrollMarginTop: 5 }} id='AppBar'>
                <Search />
                <LocationButton />
                <Button // FILTER BUTTON
                    aria-label="Filter events"
                    size='large'
                    variant="contained"
                    color='primary'
                    onClick={openFilterPanel}>
                    <TuneIcon />
                </Button>
            </Stack>
            <Filters open={filterPanelOpen} close={closeFilterPanel}/>
        </>
    )
}