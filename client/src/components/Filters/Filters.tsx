import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Drawer,
    Fab,
    SelectChangeEvent,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import { useState } from 'react';
import { Preferences, useSearchContext } from 'src/context/searchContext';
import ResponsiveDatePicker from './DatePicker';
import { Dropdown, LanguageDropdown } from './Dropdowns';


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
        'FI',
        'GB',
        'SE',
        'RU',
        'ES',
        'SA',
        'DE',
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
        'aktiviteetit',
        'raamattupiiri'
    ]
}

export default function Filters({ open, close }: Props) {
    const theme = useTheme()
    const { values: searchContextValues, setValues: setSearchContextValues } = useSearchContext()
    const [values, setValues] = useState<Preferences>(searchContextValues.preferences)


    const handleChange = (e: SelectChangeEvent<string[] | { code: string; label: string; }[]>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleDateChange = (v: unknown) => {
        setValues({
            ...values,
            date_origin: v as Date
        })
    }

    const beforeClose = () => {
        setSearchContextValues({
            ...searchContextValues,
            preferences: values
        })
        localStorage.setItem('preferences', JSON.stringify(values))
    }

    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={() => {beforeClose(); close()}}
            PaperProps={{sx: {backgroundColor: theme.palette.secondary.main}}}
        >
            <Box height={'100%'} width={'100%'}>
                <Typography variant='h1' textAlign={'center'} p={2} color={'whitesmoke'}>NexTep</Typography>

                <Box>
                    <ResponsiveDatePicker defaultValue={new Date(values.date_origin)} onChange={handleDateChange}/>
                </Box>

                <Stack alignItems={'center'} gap={1}>
                    <Dropdown name='category' label='Kategoria' options={options.category} values={values.category} onChange={handleChange} />
                    <Dropdown name='age_group' label='Ikäryhmä' options={options.age_group} values={values.age_group} onChange={handleChange} />
                    <LanguageDropdown name='language' label='Kieli' options={options.language} values={values.language} onChange={handleChange} />
                    <Dropdown name='denomination' label='Kirkkokunta' options={options.denomination} values={values.denomination} onChange={handleChange} />
                </Stack>

                <Box display={'grid'} justifyContent={'center'} p={5}>
                    <Fab color='primary' aria-label="menu-close" onClick={() => {beforeClose(); close()}} >
                        <CloseIcon />
                    </Fab>
                </Box>

            </Box>
        </Drawer>
    )
}

