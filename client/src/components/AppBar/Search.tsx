import { Input } from '@mui/base';
import SearchIcon from '@mui/icons-material/Search';
import { Stack, styled, useTheme } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate()
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
                navigate('/')
            }, 500);
        }

        return () => {
            clearTimeout(typingTimer.current);
        };
    }, [isTyping, searchValue])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Check if the pressed key is the Enter key (key code 13)
            if (event.key === 'Enter') {
                // Blur the specified ref
                inputRef.current?.blur();
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('keypress', handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

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