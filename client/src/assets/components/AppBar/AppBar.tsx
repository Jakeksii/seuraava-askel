import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, Drawer, Fab, Stack } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchContext } from '../../context/searchContext';
import Filters from './Filters';
import LocationButton from './LocationButton';
import Search from './Search';

export default function AppBar() {
    // INPUT
    const searchContext = useSearchContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const [isTyping, setIsTyping] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    let typingTimer: NodeJS.Timeout;

    useEffect(() => {
        if (isTyping && searchValue.length >= 3) {
            typingTimer = setTimeout(() => {
                setIsTyping(false);
                searchContext.setValues({
                    ...searchContext.values,
                    search: searchValue
                })
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
                <Stack direction='row' width='100%' gap={1} sx={{pl: 1}}>
                    <Search />
                    <LocationButton />
                    {/* <Button // FILTER BUTTON
                        aria-label="Filter events"
                        size='large'
                        variant="contained"
                        color='primary'
                        onClick={openFilterPanel}>
                        <FilterAltIcon color="info" />
                    </Button>  */}
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