import { Input } from '@mui/base';
import SearchIcon from '@mui/icons-material/Search';
import { Button, DialogContent } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SearchResult } from '../../../types';
import { ERROR_DEFAULT } from '../../constants';
import { useSearchContext } from '../../context/searchContext';
import getSearchQuery from '../../functions/getSearchQuery';
import { getHighlightedText, getPrefix } from '../../functions/searchResultFunctions';
import useGetSearchResults from '../../hooks/api-hooks/useGetSearchResults';
import Loading from '../../partials/Loading';

interface Props {
    open: boolean
    close: () => void
}

export default function Search(props: Props) {
    const searchContext = useSearchContext()

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
        // Handle search
        let query
        switch(data.type){
            case "city": query = getSearchQuery({type:"city", search:data.data}); break
            case "organization": query = getSearchQuery({type:"organization", search:data.data}); break
            case "title": query = getSearchQuery({type:"title", search:data.data}); break
        }
        searchContext.setValues({
            ...searchContext.values,
            query: query,
            search: data.data
        })
        props.close()
    }
    const searchResults = () => {
        if (isLoading) return <Loading size={40} />
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
        <DialogContent>
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
    )
}