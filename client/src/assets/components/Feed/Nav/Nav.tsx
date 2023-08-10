import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import { useEffect, useRef, useState } from 'react';
import { SEARCH_TYPE_LOCATION } from '../../../constants';
import { useLocationContext } from '../../../context/locationContext';
import { useSearchContext } from '../../../context/searchContext';
import LocationButton from './LocationButton';
import SearchInput from './SearchInput';

interface Props {
    onFilterClick: () => void
}

export default function Nav(props: Props) {

    //Sticky navbar
    const [isSticky, setIsSticky] = useState(false);
    const navbar = useRef<HTMLDivElement>(null)
    let navBarStartPos = 0;
    let sticky = false;
    useEffect(() => {
        const handleScroll = () => {
            if (navbar.current) {
                const rect = navbar.current.getBoundingClientRect();
                if (rect.top <= 0 && !sticky) {
                    navBarStartPos = window.scrollY + 1
                    sticky = true
                    setIsSticky(true);
                } else if (window.scrollY < navBarStartPos) {
                    sticky = false
                    setIsSticky(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const searchContext = useSearchContext()
    const locationContext = useLocationContext()

    // Called from Search result element
    const searchResultClick = (search: string, type: string) => {
        locationContext.clearLocation()

        // Handle search
        const query = '?s=' + search + '&type=' + type
        searchContext.setQuery(query)
    }

    // Called from location button
    const locationSearch = () => {
        // Handle search
        const query =
            '?latitude=' + locationContext.coords.latitude +
            '&longitude=' + locationContext.coords.longitude +
            '&type=' + SEARCH_TYPE_LOCATION
        searchContext.setQuery(query)
    }

    return (
        <section className='h-[56px]'>
            <div className={isSticky ? 'z-10 w-[100%] max-w-[820px] fixed top-0' : 'z-10 w-[100%] max-w-[820px]'}>
                <div ref={navbar} className='text-white flex justify-center items-center p-1  pl-4 bg-blue-600 shadow-md shadow-gray-700'>
                    <SearchInput searchResultClick={searchResultClick} />
                    <LocationButton onSearchByLocation={locationSearch} />
                    <IconButton // FILTER BUTTON
                        onClick={props.onFilterClick}
                        size="large"
                        aria-label="Filter events"
                        color="inherit">
                        <FilterAltIcon />
                    </IconButton>
                </div>
            </div>
        </section>
    )
}