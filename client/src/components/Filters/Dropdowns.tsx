/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";

export function LanguageDropdown({ name, label, options, values, onChange }: DropdownProps) {
    return (
        <FormControl sx={{ width: 250 }}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                labelId={name}
                multiple
                name={name}
                value={values}
                renderValue={(selected) => (<Typography color={'white'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.map((code) => getLabel(code)).join(', ')}</Typography>)}
                onChange={onChange}
                input={<OutlinedInput label={label} />}>
                {options.map((option, i) =>
                    <MenuItem key={i} value={option as any}>
                        <Checkbox checked={values.indexOf(option) > -1} />
                        <ListItemText primary={UpperCaseFirstChar(getLabel(option))} />
                        {getFlag(option)}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

const languages = [
    { code: 'FI', label: 'suomi' },
    { code: 'GB', label: 'englanti' },
    { code: 'SE', label: 'ruotsi' },
    { code: 'RU', label: 'venäjä' },
    { code: 'ES', label: 'espanja' },
    { code: 'SA', label: 'arabia' },
    { code: 'DE', label: 'saksa' },
]

function getLabel(code: string): string {
    const language = languages.find((lang) => lang.code === code);
    return language ? language.label : 'virhe';
}

function getFlag(code: string) {
    return (
        <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
            style={{ borderRadius: '2px' }}
            alt=""
        />
    )
}

type DropdownProps = {
    name: string
    label: string
    options: string[]
    values: string[]
    onChange: (e: SelectChangeEvent<string[]>) => void
}
export function Dropdown({ name, label, options, values, onChange }: DropdownProps) {
    return (
        <FormControl sx={{ width: 250 }}>
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

function UpperCaseFirstChar(text: string) {
    return text.at(0)?.toUpperCase() + text.slice(1)
}