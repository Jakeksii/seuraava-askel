import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { Button, Drawer, Fab, Paper, Stack } from '@mui/material';
import { Input } from '@mui/base'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Filters from './Filters';
import Searchbar from './searchbar';

export default function Nav() {
    // INPUT
    const inputRef = useRef<HTMLInputElement>(null)
    const [isTyping, setIsTyping] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    let typingTimer: NodeJS.Timeout;

    useEffect(() => {
        if (isTyping && searchValue.length >= 3) {
            typingTimer = setTimeout(() => {
                setIsTyping(false);
            }, 500);
        }

        return () => {
            clearTimeout(typingTimer);
        };
    }, [isTyping, searchValue]);

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);

        if (!isTyping) {
            setIsTyping(true);
        }
    }
    function selectInput() {
        inputRef.current?.select()
    }


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
            <Stack
                gap={3}
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                onClick={selectInput}
                className='mb-2 w-full flex justify-center items-center p-3 rounded-lg text-info-main shadow-md bg-secondary-main'>
                
                <Searchbar />

                <Button // LOCATION BUTTON
                    variant='contained'
                    size='large'
                    color='primary'>
                    <LocationOnIcon />
                </Button>

                <Button // FILTER BUTTON
                    aria-label="Filter events"
                    size='large'
                    variant="contained"
                    color='primary'
                    onClick={openFilterPanel}>
                    <FilterAltIcon />
                </Button>
            </Stack>



            <Drawer
                anchor={'right'}
                open={filterPanelOpen}
                onClose={closeFilterPanel}
            >
                <div className='h-full bg-primary-main flex flex-col'>
                    <Filters />
                    <div className='self-center mb-10'>
                        <Fab color='primary' size='small' aria-label="menu-close" onClick={closeFilterPanel} >
                            <CloseIcon />
                        </Fab>
                    </div>
                </div>
            </Drawer>
        </>
    )
}