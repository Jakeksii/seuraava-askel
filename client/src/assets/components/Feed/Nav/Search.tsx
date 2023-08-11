import { Input } from '@mui/base';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, CircularProgress, ClickAwayListener } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { SEARCH_TYPE_LOCATION } from '../../../constants';
import { useLocationContext } from '../../../context/locationContext';
import { useSearchContext } from '../../../context/searchContext';
import useGetSearchResults from '../../../hooks/api-hooks/useGetSearchResults';
import LocationButton from './LocationButton';
import SearchResultsElement from './SearchResultsElement';

const loadingBar = (
    <div className="m-2 flex justify-center">
        <CircularProgress size={20} />
    </div>
)

export default function Search() {
    const searchContext = useSearchContext()
    const locationContext = useLocationContext()

    // Called from location button
    const locationSearch = () => {
        // Handle search
        const query =
            '?latitude=' + locationContext.coords.latitude +
            '&longitude=' + locationContext.coords.longitude +
            '&type=' + SEARCH_TYPE_LOCATION
        searchContext.setQuery(query)
    }

    // INPUT
    // SEARCH
    const [isTyping, setIsTyping] = useState(true);
    const [resultsVisible, setResultsVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    let typingTimer: NodeJS.Timeout;

    const { isLoading, data, isError } = useGetSearchResults({
        query: encodeURI(searchValue.replace(/\s+/g, ' ').trim()),
        enabled: (!isTyping && searchValue.length >= 3)
    })

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

    useEffect(() => {
        if (locationContext.locationOn) setSearchValue('')
    }, [locationContext.locationOn])

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);

        // If user has typed only 2 characters we dont want to display search results
        if (event.target.value.length < 3) {
            setResultsVisible(false)
        } else {
            setResultsVisible(true)
        }

        if (!isTyping) {
            setIsTyping(true);
        }
    }
    const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select()
        setResultsVisible(true)
    }
    const onSearchResultClick = (search: string, type: string) => {
        setSearchValue(search)
        setResultsVisible(false)
        locationContext.clearLocation()
        // Handle search
        const query = '?s=' + search + '&type=' + type
        searchContext.setQuery(query)
    }

    const searchResults = () => {
        if (isLoading) return loadingBar
        if (isError) return <SearchResultsElement error={"An error occurred. Try again"} />
        if (data) return <SearchResultsElement searchValue={searchValue.replace(/\s+/g, ' ').trim()} searchResults={data} searchResultClick={onSearchResultClick} />
        return <></>
    }

    return (
        <section className='h-14'>
            <div className='relative z-50 p-2 rounded-b-2xl bg-secondary-dark'>
                <div className='flex justify-center items-center gap-1'>
                    <ClickAwayListener onClickAway={() => setResultsVisible(false)}>
                        <div className='grow'>
                            <div>
                                <Input // SEARCH BAR
                                    className='w-[100%] p-2 rounded-md text-white shadow-md bg-primary-main focus-within:bg-primary-dark transition-colors'

                                    slotProps={{
                                        input: {
                                            className:
                                                'bg-transparent outline-0 w-[100%] placeholder-slate-100 rounded-sm'
                                        }
                                    }}
                                    aria-label='search'
                                    placeholder='Etsi tapahtumia...'
                                    onChange={onSearchChange}
                                    value={searchValue}
                                    onFocus={onInputFocus} />
                            </div>
                        </div>
                    </ClickAwayListener>
                    <LocationButton onSearchByLocation={locationSearch} />
                    <Button // FILTER BUTTON
                        aria-label="Filter events"
                        size='large'
                        variant="contained"
                        color='primary'>
                        <FilterAltIcon />
                    </Button>
                </div>
                <div className='p-1'>
                    {resultsVisible ? searchResults() : <></>}
                </div>
            </div>
        </section>
    )
}