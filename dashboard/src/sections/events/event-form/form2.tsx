/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useState } from "react";
import { Schema2, schema2 } from "./schemas";
import Typography from "@mui/material/Typography";
import { format, formatDistance } from "date-fns";
import fi from "date-fns/locale/fi";
import Box from "@mui/material/Box";

type Props = {
    setData: (data: Schema2) => void
    defaultValues: Schema2
}

export function Form2({ setData, defaultValues }: Props) {
    const [start_date, setStart_date] = useState<Date>(defaultValues.start_date)
    const [end_date, setEnd_date] = useState<Date>(defaultValues.end_date)
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

    const diffInMinutes = (end_date.getTime() - start_date.getTime()) / (1000 * 60);

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <Stack spacing={2} justifyContent={'space-around'} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box>
                        <Typography variant="h6" textAlign='center'>{format(start_date!, 'dd MMM yyyy | HH:mm', { locale: fi })} </Typography>
                        <StaticDateTimePicker
                            minutesStep={5}
                            sx={{
                                backgroundColor: 'transparent',
                                margin: 0
                            }}
                            slots={{
                                actionBar: () => null,
                                toolbar: () => null
                            }}
                            value={start_date}
                            onChange={(value) => setStart_date(value!)}
                        />
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" textAlign='center'>{format(end_date!, 'dd MMM yyyy | HH:mm', { locale: fi })} </Typography>
                        <StaticDateTimePicker
                            minutesStep={5}
                            minDateTime={start_date ?? undefined}
                            sx={{
                                backgroundColor: 'transparent',
                                margin: 0
                            }}
                            slots={{
                                actionBar: () => null,
                                toolbar: () => null
                            }}
                            value={end_date}
                            onChange={(value) => setEnd_date(value!)}
                        />
                    </Box>
                </Stack>
                
                <Typography 
                    variant="h6" 
                    sx={{ textAlign: 'center' }}
                    color={diffInMinutes < 20 ? 'error' : 'inherit'}
                    >
                    {diffInMinutes < 20 ? '' : 'Tapahtuman Kesto: ' + formatDistance(start_date!, end_date!, { locale: fi })}
                </Typography>

                <Typography color="error">{errorMSG}</Typography>
            </Stack>
            <Button variant="contained" fullWidth type="submit">
                Seuraava
            </Button>
        </form>
    )
}