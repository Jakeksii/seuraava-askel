import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SelectImage from "../select-image";
import { EXTRACT_MAX_LENGTH, Schema1, schema1 } from "./schemas";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useAppContext } from "src/context/appContext";

type Props = {
    setData: (data: Schema1) => void
    defaultValues: Schema1
}

export function Form1({ setData, defaultValues }: Props) {
    const { selectedOrganization } = useAppContext()
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Schema1>({
        defaultValues,
        resolver: zodResolver(schema1)
    })
    const image_id = watch('image_id')
    const extract = watch('extract')

    return (
        <form onSubmit={handleSubmit(setData)}>
            <Stack spacing={4}>
                <Stack spacing={2}>
                    <TextField
                        label='Otsikko'
                        fullWidth
                        {...register('title')}
                        helperText={errors.title && errors.title.message}
                        error={!!errors.title}
                    />
                    <Stack direction={{ sm: 'column', md: 'row' }} spacing={4}>
                        <SelectImage
                            image_id={image_id}
                            setImage_id={(value) => setValue('image_id', value)}
                            organization_id={selectedOrganization!}
                        >
                            <TextField
                                sx={{ position: 'absolute', zIndex: -1000, opacity: 0, pointerEvents: 'none' }}
                                autoComplete="off"
                                InputProps={{
                                    onFocus: (event) => {
                                        event.target.parentElement?.focus()
                                    }
                                }}
                                {...register('image_id')}
                            />
                        </SelectImage>

                        <Box sx={{ flexGrow: 1 }}>
                            <TextField
                                label='Lyhyt ote'
                                multiline
                                rows={6}
                                fullWidth
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                    }
                                }}
                                inputProps={{ maxLength: EXTRACT_MAX_LENGTH }}
                                {...register('extract')}
                                helperText={errors.extract && errors.extract.message}
                                error={!!errors.extract}
                            />
                            <Typography sx={{ color: 'text.secondary', textAlign: 'right', mt: '1px !important' }}>{extract.length} / {EXTRACT_MAX_LENGTH}</Typography>
                        </Box>
                    </Stack>
                </Stack>
                <Button variant="contained" type="submit" fullWidth>
                    Seuraava
                </Button>
            </Stack>
        </form>
    )
}