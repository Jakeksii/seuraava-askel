/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useState } from "react";
import { Schema2, schema2 } from "./schemas";
import Typography from "@mui/material/Typography";

type Props = {
    setData: (data: Schema2) => void
    defaultValues: Schema2
}

export function Form2({ setData, defaultValues }: Props) {
    const [start_date, setStart_date] = useState<Date | null>(defaultValues.start_date)
    const [end_date, setEnd_date] = useState<Date | null>(defaultValues.end_date)
    const [errorMSG, setErrorMSG] = useState<string | null>(null)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        try {
            const data = {
                start_date,
                end_date
            }
            setErrorMSG(null)
            setData(schema2.parse(data))
        } catch (e: any) {
            const error = JSON.parse(e)
            setErrorMSG(error[0].message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <Stack spacing={2} justifyContent={'space-between'} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                    <StaticDateTimePicker
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                        slots={{
                            actionBar: () => null
                        }}
                        localeText={{
                            toolbarTitle: 'Aloitusaika',
                        }}
                        value={start_date}
                        onChange={(value) => setStart_date(value)}
                    />
                    <StaticDateTimePicker
                        minDateTime={start_date ?? undefined}
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                        slots={{
                            actionBar: () => null
                        }}
                        localeText={{
                            toolbarTitle: 'Lopetusaika',
                        }}
                        value={end_date}
                        onChange={(value) => setEnd_date(value)}
                    />
                </Stack>
                {errorMSG && <Typography color="error">{errorMSG}</Typography>}
            </Stack>
            <Button variant="contained" fullWidth type="submit">
                Seuraava
            </Button>
        </form>
    )
}