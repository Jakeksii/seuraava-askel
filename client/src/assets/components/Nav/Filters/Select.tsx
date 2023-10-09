import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { AvailableFilters } from '../../../../types';

import { filters as FilterNames } from "../../../../language/source.json";

type HandleFilterChangeProps = {
    filter: "meta.denomination" | "meta.size" | "meta.language" | "meta.price.value" | "distance"
    value: number
} | {
    filter: "meta.types"
    value: any
}

interface Props {
    onChange(props: HandleFilterChangeProps): void
    availableFilters?: AvailableFilters
}

export default function Select(props: Props) {
    function getOptions() {
        type option = { label: string, id: number, key: number }
        if (props.availableFilters?.types) {
            let options: option[] = []
            props.availableFilters?.types.forEach((type, i) => {
                options.push({ label: FilterNames.types.find(obj => obj.key === type.value)?.value ?? "", id: i, key: type.value })
            })
            return options
        }
        return []
    }
    function isOptionEqualToValue(option: any, value: any): boolean {
        if (option.label === value.label) {
            return true
        }
        return false
    }
    return (
        <Autocomplete
            multiple
            options={getOptions()}
            size="small"
            limitTags={1}
            disableCloseOnSelect
            onChange={(_, v) => props.onChange({ filter: "meta.types", value: v })}
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
            sx={{ width: 300, maxHeight: '200px', }}
            color="secondary"
            renderInput={(params) => <TextField {...params} placeholder="Tapahtumatyyppi" />}
        />
    )
}