/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticDateTimePicker as MUIStaticDateTimePicker } from "@mui/x-date-pickers";

type Props = {

    toolbarTitle?: string
    minDateTime?: Date

    [key: string]: any
}

export default function StaticDateTimePicker({toolbarTitle, minDateTime, ...props}: Props) {

    return (
        <MUIStaticDateTimePicker
            minDateTime={minDateTime ? new Date(minDateTime) : undefined}
            {...props}
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