import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, Drawer, Fab } from '@mui/material';
import { ChangeEvent, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useSearchContext } from '../../context/searchContext';
import Loading from '../../partials/Loading';
import Filters from './Filters';
import LocationButton from './LocationButton';
import { Input } from '@mui/base';

const Search = lazy(() => import('./Search'))

export default function Nav() {
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

    // Search modal
    const [searchModalOpen, setSearchModalOpen] = useState(false)
    function closeSearchModal() {
        setSearchModalOpen(false)
    }

    return (
        <>
            <section className='ml-1.5 mr-1.5'>
                <div className='flex justify-center items-center gap-1'>
                    <section onClick={selectInput} className=' w-full flex justify-center items-center p-3 rounded-lg text-info-main shadow-md bg-primary-main'>
                        <SearchIcon color='info' />
                        <Input
                            onFocus={selectInput}
                            className='w-full pl-1'
                            slotProps={{
                                input: {
                                    autoFocus: true,
                                    ref: inputRef,
                                    className:
                                        'bg-transparent outline-0 w-full placeholder-[#f5cca8] rounded-sm'
                                }
                            }}
                            aria-label='search'
                            placeholder='Etsi tapahtumia...'
                            onChange={onSearchChange}
                            value={searchValue}
                        />
                    </section>
                    <LocationButton />
                    <Button // FILTER BUTTON
                        aria-label="Filter events"
                        size='large'
                        variant="contained"
                        color='primary'
                        onClick={openFilterPanel}>
                        <FilterAltIcon color="info" />
                    </Button>
                </div>
            </section>
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
            <Dialog open={searchModalOpen} onClose={closeSearchModal} fullWidth maxWidth="md" disableRestoreFocus sx={{ 'div .MuiPaper-root': { alignSelf: 'start', backgroundColor: 'primary.main' } }}>
                <Suspense fallback={<Loading />}>
                    <Search open={searchModalOpen} close={closeSearchModal} />
                </Suspense>
            </Dialog>
        </>
    )
}