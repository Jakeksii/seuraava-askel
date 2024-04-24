import { StaticDateTimePicker as MUIStaticDateTimePicker } from "@mui/x-date-pickers";

type Props = {
    name: string
    onChange: (name: string, value: Date | null) => void
    toolbarTitle?: string
    minDateTime?: Date
}

export default function StaticDateTimePicker({name, onChange, toolbarTitle, minDateTime}: Props) {

    return (
        <MUIStaticDateTimePicker
            onChange={(value) => onChange(name, value)}

            minDateTime={minDateTime ? new Date(minDateTime) : undefined}

            sx={{
                backgroundColor: 'transparent',
            }}
            slots={{
                actionBar: () => null
            }}
            localeText={{
                toolbarTitle: toolbarTitle,
            }}
        />
    )
}