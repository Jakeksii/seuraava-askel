import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, Drawer } from '@mui/material';
import { lazy, Suspense, useState } from 'react';
import { useSearchContext } from '../../context/searchContext';
import Filters from './Filters';
import LocationButton from './LocationButton';
import Loading from '../../partials/Loading';

const Search = lazy(() => import('./Search'))

export default function Nav() {
    const { values: { search } } = useSearchContext()

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
                    <div className='grow '>
                        <div>
                            <Button
                                onClick={() => setSearchModalOpen(true)}
                                variant='contained'
                                size='large'
                                className='flex gap-1 w-full'
                                aria-labelledby='app-search-label'>
                                <SearchIcon color='info' />
                                <span id="app-search-label" className='text-info-main whitespace-nowrap overflow-hidden'>{search ?? 'Etsi tapahtumia...'}</span>
                            </Button>
                        </div>
                    </div>
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
                disableScrollLock
            >
                <Filters />
            </Drawer>
            <Dialog open={searchModalOpen} onClose={closeSearchModal} fullWidth maxWidth="md" disableRestoreFocus sx={{ 'div .MuiPaper-root': {alignSelf: 'start', backgroundColor: 'primary.main'} }}>
                <Suspense fallback={<Loading />}>
                    <Search open={searchModalOpen} close={closeSearchModal} />
                </Suspense>
            </Dialog>
        </>
    )
}