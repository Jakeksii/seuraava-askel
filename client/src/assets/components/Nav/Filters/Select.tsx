import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import Language from "../../../../language/source.json";

interface Props {
    onChange(props: {filter:string, value:any}): void
    filterType: "types" | "denomination" | "size" | "language"
    availableFilters?: [{value:string}]
    isLoading: boolean
    selectedFilters?: string[]
}

export default function Select(props: Props) {
    const language:{key:string,value:string}[] = Language.filters[props.filterType]
    const placeholder:string = Language.filter_names.find(obj => obj.key === props.filterType)?.value ?? ""

    function getOptions() {
        type option = { label: string, id: number, key: string, selected:boolean }
        if (props.availableFilters) {
            let options: option[] = []
            props.availableFilters.forEach((filter, i) => {
                options.push({ label: language.find(obj => obj.key === filter.value)?.value ?? "", id: i, key: filter.value, selected:true })
            })
            return options
        }
        return []
    }
    function getSelectedOptions() {
        type option = { label: string, id: number, key: string }
        if (props.selectedFilters) {
            let options: option[] = []
            props.selectedFilters.forEach((filter, i) => {
                options.push({ label: language.find(obj => obj.key === filter)?.value ?? "", id: i, key: filter })
            })
            return options
        }
        return []
    }
    function isOptionEqualToValue(option: any, value: any): boolean {
        if (option.key === value.key) {
            return true
        }
        return false
    }
    return (
        <Autocomplete
            multiple
            value={getSelectedOptions()}
            options={getOptions()}
            size="small"
            noOptionsText="Ei valintoja"
            id={'Filter'+props.filterType}
            limitTags={1}
            disabled={props.isLoading}
            color='secondary'
            disableCloseOnSelect
            onChange={(_, v) => props.onChange({ filter: props.filterType, value: v })}
            isOptionEqualToValue={(o, v) => isOptionEqualToValue(o, v)}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={<CheckBoxOutlineBlankIcon />}
                        checkedIcon={<CheckBoxIcon />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.label}
                </li>
            )}
            autoComplete={false}
            sx={{ width: 300, maxHeight: '200px', }}
            renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
        />
    )
}