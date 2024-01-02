import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useEffect, useMemo, useState } from 'react';
import { PlaceType } from '../types';

type Props = {
    onPlaceSelected: (place: PlaceType) => void
}

const autocompleteService = { current: null };

export default function GooglePlacesAutocomplete(props:Props) {
    const [value, setValue] = useState<PlaceType | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState<readonly PlaceType[]>([])

    function onPlaceSelect(value: PlaceType | null){
        setValue(value)
        value && props.onPlaceSelected(value)
    }

    const fetch = useMemo(
        () =>
            debounce(
                (
                    request: { input: string },
                    callback: (results?: readonly PlaceType[]) => void,
                ) => {
                    (autocompleteService.current as any).getPlacePredictions(
                        {
                            ...request,
                            componentRestrictions: { country: 'fi' }
                        },
                        callback,
                    );
                    console.log(request)
                },
                400,
            ),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            
            autocompleteService.current = new (
                window as any
            ).google.maps.places.AutocompleteService();
            
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly PlaceType[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google-places-autocomplete"
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText=""
            onChange={(_, newValue: PlaceType | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                onPlaceSelect(newValue)
            }}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Etsi sijaintia" fullWidth />
            )}
            renderOption={(props, option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match: any) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}

