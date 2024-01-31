import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Box, Checkbox, Drawer, Fab, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from 'react';


type Props = {
    open: boolean
    close: () => void
}

const options = {
    age_group: [
        'lapset',
        'nuoret',
        'nuoret aikuiset',
        'aikuiset',
    ],
    language: [
        { code: 'FI', label: 'suomi' },
        { code: 'GB', label: 'englanti' },
        { code: 'SE', label: 'ruotsi' },
        { code: 'RU', label: 'venäjä' },
        { code: 'ES', label: 'espanja' },
        { code: 'SA', label: 'arabia' },
        { code: 'DE', label: 'saksa' },
    ],
    denomination: [
        'yhteiskristillinen',
        'vapaa kirkollinen',
        'luterilainen',
        'helluntalainen'
    ],
    category: [
        'jumalanpalvelus',
        'konsertti',
        'hyväntekeväisyys',
        'illanvietto',
        'aktiviteetit'
    ]
}


type Values = {
    age_group: string[],
    language: { code: string, label: string }[]
    denomination: string[]
    category: string[],
}

export default function Filters({ open, close }: Props) {
    const theme = useTheme()
    const [values, setValues] = useState<Values>({
        age_group: [],
        language: [],
        denomination: [],
        category: [],
    })


    const handleChange = (e: SelectChangeEvent<string[]>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSearchDropdownChange = (name: string, newValues: string[]) => {
        setValues({
            ...values,
            [name]: newValues
        })
    }
    const handleLanguageDropdownChange = (name: string, newValues: { code: string, label: string }[]) => {
        setValues({
            ...values,
            [name]: newValues
        })
    }

    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={close}
        >
            <Box height={'100%'} width={'100%'} display={'grid'} justifyItems={'center'} sx={{ background: theme.palette.secondary.light }}>
                <Typography variant='h1' textAlign={'center'} p={2} color={'whitesmoke'}>NexTep</Typography>
                <Typography variant='h3' textAlign={'center'} p={2} color={'whitesmoke'}>Mieltymykset</Typography>

                <Stack>
                    <SearchDropdown name='category' label='Kategoria' options={options.category} values={values.category} onChange={handleSearchDropdownChange} />
                    <Dropdown name='age_group' label='Ikäryhmä' options={options.age_group} values={values.age_group} onChange={handleChange} />
                    <LanguageDropdown name='language' label='Kieli' options={options.language} values={values.language} onChange={handleLanguageDropdownChange} />
                    <Dropdown name='denomination' label='Kirkkokunta' options={options.denomination} values={values.denomination} onChange={handleChange} />
                </Stack>

                <Fab color='primary' aria-label="menu-close" onClick={close} >
                    <CloseIcon />
                </Fab>
            </Box>
        </Drawer>
    )
}

function UpperCaseFirstChar(text: string) {
    return text.at(0)?.toUpperCase() + text.slice(1)
}

type DropdownProps = {
    name: string
    label: string
    options: string[]
    values: string[]
    onChange: (e: SelectChangeEvent<string[]>) => void
}
type SearchDropdownProps = {
    name: string
    label: string
    options: string[]
    values: string[]
    onChange: (name: string, values: string[]) => void
}
function Dropdown({ name, label, options, values, onChange }: DropdownProps) {
    return (
        <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                labelId={name}
                multiple
                name={name}
                value={values}
                renderValue={(selected) => (<Typography color={'white'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.join(', ')}</Typography>)}
                onChange={onChange}
                input={<OutlinedInput label={label} />}>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={values.indexOf(option) > -1} />
                        <ListItemText primary={UpperCaseFirstChar(option)} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}


function SearchDropdown({ name, label, options, values, onChange }: SearchDropdownProps) {
    return (
        <FormControl sx={{ m: 1, width: 250 }}>
            <Autocomplete
                multiple
                disableCloseOnSelect
                value={values}
                onChange={(_, values: string[]) => { onChange(name, values) }}
                options={options}
                renderInput={(params) => <TextField rows={1} {...params} label={label} />}
                renderTags={(selected) => (<Typography color={'white'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.join(', ')}</Typography>)}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            checked={selected}
                        />
                        {UpperCaseFirstChar(option)}
                    </li>
                )}
            />
        </FormControl>
    )
}

type LanguageDropdownProps = {
    name: string
    label: string
    options: { code: string, label: string }[]
    values: { code: string, label: string }[]
    onChange: (name: string, values: { code: string, label: string }[]) => void
}
function LanguageDropdown({ name, label, options, values, onChange }: LanguageDropdownProps) {
    return (
        <FormControl sx={{ m: 1, width: 250 }}>
            <Autocomplete
                multiple
                disableCloseOnSelect
                value={values}
                onChange={(_, values: { code: string, label: string }[]) => { onChange(name, values) }}
                options={options}
                isOptionEqualToValue={(option, value) => (option.code === value.code)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField rows={1} {...params} label={label} />}
                renderTags={(selected) => (<Stack direction={'row'} flexGrow={0} gap={1} p={1}>{selected.map((item) => (<img
                    key={item.code}
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                    style={{ borderRadius: '2px' }}
                    alt=""
                />))}</Stack>)}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            checked={selected}
                        />
                        <Stack key={option.label} direction={'row'} flexGrow={0} gap={1} alignItems={'center'}>
                            {UpperCaseFirstChar(option.label)}
                            <img
                                loading="lazy"
                                width="20"
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                alt=""
                                style={{ borderRadius: '2px' }}
                            />
                        </Stack>
                    </li>
                )}
            />
        </FormControl>
    )
}