import { Checkbox, FormControlLabel } from "@mui/material";
import { AvailableFilters } from '../../../../types';

interface Props {
    onChange(props: { filter: "size", toggled:boolean, value: any }): void
    availableFilters?: AvailableFilters
    isLoading: boolean
}

export default function Select(props: Props) {
    return (
        <div className="flex justify-center">
            <FormControlLabel
                disabled={props.isLoading}
                value="top"
                control={<Checkbox color="secondary" />}
                label="Pieni"
                labelPlacement="bottom"
                onChange={(_, checked) => props.onChange({ filter: "size", toggled: checked, value: 0 })}
            />
            <FormControlLabel
                disabled={props.isLoading}
                value="top"
                control={<Checkbox color="secondary" />}
                label="Keskisuuri"
                labelPlacement="bottom"
                onChange={(_, checked) => props.onChange({ filter: "size", toggled: checked, value: 1 })}
            />
            <FormControlLabel
                disabled={props.isLoading}
                value="top"
                control={<Checkbox color="secondary" />}
                label="Suuri"
                labelPlacement="bottom"
                onChange={(_, checked) => props.onChange({ filter: "size", toggled: checked, value: 2 })}
            />
        </div>
    )
}