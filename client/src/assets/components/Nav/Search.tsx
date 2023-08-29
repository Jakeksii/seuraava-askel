import { Input } from '@mui/base';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ERROR_DEFAULT } from '../../constants';
import { useLocationContext } from '../../context/locationContext';
import { useSearchContext } from '../../context/searchContext';
import { getHighlightedText, getPrefix } from '../../functions/searchResultFunctions';
import useGetSearchResults from '../../hooks/api-hooks/useGetSearchResults';
import { SearchResult } from '../../types';

const loadingBar = (
    <div className="m-2 flex justify-center text-white">
        <CircularProgress size={40} color='inherit' />
    </div>
)

interface Props {
    open: boolean
    close: () => void
}

export default function Search(props: Props) {
    const searchContext = useSearchContext()
    const locationContext = useLocationContext()

    // INPUT
    const inputRef = useRef<HTMLInputElement>(null)
    const [isTyping, setIsTyping] = useState(true);
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

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);

        if (!isTyping) {
            setIsTyping(true);
        }
    }
    function selectInput() {
        inputRef.current?.select()
    }

    // SearchResults
    const onSearchResultClick = (data: SearchResult) => {
        locationContext.clearLocation()
        // Handle search
        const query = '?s=' + data.data + '&type=' + data.type
        searchContext.setValues({
            ...searchContext.values,
            query: query,
            search: data.data
        })
        props.close()
    }
    const searchResults = () => {
        if (isLoading) return loadingBar
        if (isError) return <h5 key={0} className='pt-2 text-center text-info-main'> {ERROR_DEFAULT} </h5>
        if (data && data.length === 0) return <h5 key={0} className='pt-2 text-center text-info-main'> {getHighlightedText(searchValue, searchValue)} {" ei tuottanut tuloksia."} </h5>
        if (data) return <ul>
            {
                data.map((result, index) => {
                    return (
                        <li key={index} className='pb-1'>
                            <Button
                                variant="contained"
                                color="info"
                                fullWidth
                                onClick={() => onSearchResultClick(result)} >
                                <div className='flex flex-col md:flex-row'>
                                    <p className="pl-1 pr-1 text-primary-main">{getPrefix(result.type)}</p>
                                    <p className="text-primary-main">{getHighlightedText(result.data, searchValue)}</p>
                                </div>
                            </Button>
                        </li>
                    )
                })
            }
        </ul>
    }


    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="md" disableRestoreFocus disableScrollLock>
            <DialogContent className='bg-primary-main m-1 rounded-sm'>
                <section onClick={selectInput} className='mb-2 w-full flex justify-center items-center p-3 rounded-lg text-info-main shadow-md bg-secondary-main'>
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && data) {
                                onSearchResultClick(data[0])
                            }
                        }}
                    />
                </section>
                {searchResults()}
            </DialogContent>
        </Dialog>
    )
}