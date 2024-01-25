import { Input } from '@mui/base';
import SearchIcon from '@mui/icons-material/Search';
import { Stack, styled, useTheme } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchContext } from 'src/context/searchContext';
import { useIsTiny } from 'src/hooks/useResponsive';

const StyledInput = styled(Input)(({ theme }) => ({
    width: '100%',
    input: {
        paddingLeft: 4,
        background: 'transparent',
        outline: 0,
        width: '100%',
        color: theme.palette.primary.main,
        paddingInline: 5,
        paddingBlock: 0,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        border: 'none',
        '&::placeholder': {
            color: theme.palette.primary.main
        }
    },
    
}))

export default function Search() {
    // INPUT
    const isTiny = useIsTiny()
    const theme = useTheme()
    const searchContext = useSearchContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputSelected, setInputSelected] = useState(false)
    const [isTyping, setIsTyping] = useState(true);
    const [searchValue, setSearchValue] = useState(searchContext.values.search ?? "")

    const typingTimer = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if (isTyping && (searchValue.length >= 3 || searchValue.length === 0)) {
            typingTimer.current = setTimeout(() => {
                setIsTyping(false);
                searchContext.setValues({
                    ...searchContext.values,
                    search: searchValue
                })
            }, 500);
        }

        return () => {
            clearTimeout(typingTimer.current);
        };
    }, [isTyping, searchValue])

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);

        if (!isTyping) {
            setIsTyping(true);
        }
    }
    function selectInput() {
        !inputSelected && inputRef.current?.select()
        setInputSelected(true)
    }

    return (
        <Stack onClick={selectInput} direction={'row'}
            sx={{
                width: '100%',
                alignItems: 'center',
                p: isTiny ? 0.5 : 1,
                borderRadius: 1,
                color: theme.palette.primary.main,
                background: theme.palette.secondary.main,
                boxShadow: theme.shadows[2]
            }}>
            <SearchIcon />
            <StyledInput
                onFocus={selectInput}
                onBlur={() => setInputSelected(false)}
                slotProps={{
                    input: {
                        autoFocus: true,
                        ref: inputRef,
                    },
                }}
                placeholder='Etsi tapahtumia...'
                onChange={onSearchChange}
                value={searchValue}
            />
        </Stack>
    )
}