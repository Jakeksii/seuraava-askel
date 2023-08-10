import { ClickAwayListener, Input } from "@mui/base";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocationContext } from "../../../context/locationContext";
import useGetSearchResults from "../../../hooks/api-hooks/useGetSearchResults";
import SearchResultsElement from "./SearchResultsElement";

interface Props {
    searchResultClick: (search: string, type: string) => void
}

const loadingBar = (
    <div className="m-2 flex justify-center">
        <CircularProgress size={20} />
    </div>
)

export default function SearchInput(props: Props) {

    const locationContext = useLocationContext()

    // SEARCH
    const [isTyping, setIsTyping] = useState(true);
    const [resultsVisible, setResultsVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    let typingTimer: NodeJS.Timeout;

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoading, data, isError } = useGetSearchResults({
        query: encodeURI(searchValue),
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
        if(locationContext.locationOn) setSearchValue('')
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
        props.searchResultClick(search, type)
    }

    const searchResults = () => {
        if (isLoading) return loadingBar
        if (isError) return <SearchResultsElement error={"An error occurred. Try again"} />
        if (data && data.length > 0) return <SearchResultsElement searchValue={searchValue} searchResults={data} searchResultClick={onSearchResultClick} />
        return <></>
    }

    return (
        <ClickAwayListener onClickAway={() => setResultsVisible(false)}>
            <div className='grow'>
                <div >
                    <Input // SEARCH BAR
                        ref={inputRef}
                        className='w-[100%] p-2 rounded-md bg-blue-500 focus-within:bg-blue-400 '
                        slotProps={{
                            input: {
                                className:
                                    'bg-transparent outline-0 w-[100%] placeholder-slate-300'
                            }
                        }}
                        aria-label='search'
                        placeholder='Etsi tapahtumia...'
                        onChange={onSearchChange}
                        value={searchValue}
                        onFocus={onInputFocus} />
                </div>

                <div className='h-0 relative ml-2 mr-2'>
                    <div className='z-10 absolute w-[100%] bg-white text-black grid grid-cols-1 rounded-b-md shadow-md'>
                        {resultsVisible ? searchResults() : <></>}
                    </div>
                </div>
            </div>

        </ClickAwayListener>
    )
}