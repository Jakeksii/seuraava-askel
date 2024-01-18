import { Input } from '@mui/base';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchContext } from '../../context/searchContext';

export default function Search() {
    // INPUT
    const searchContext = useSearchContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const [isTyping, setIsTyping] = useState(true);
    const [searchValue, setSearchValue] = useState(searchContext.values.search ?? "")
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

    return (
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
    )
}