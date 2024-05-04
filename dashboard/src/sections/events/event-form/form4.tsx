import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import TextEditor from "src/components/text-editor/text-editor";
import { Schema4, schema4 } from "./schemas";

type Props = {
    setData: (data: Schema4) => void
    defaultValues: Schema4
}

export function Form4({ setData, defaultValues }: Props) {
    const { handleSubmit, setValue, watch } = useForm<Schema4>({
        defaultValues,
        resolver: zodResolver(schema4)
    })
    const description = watch('description')

    return (
        <form onSubmit={handleSubmit(setData)}>
            <Stack spacing={4}>
                <TextEditor value={description ?? ""} onChange={(value) => setValue('description', value)} />
                <Button variant="contained" fullWidth type="submit">
                    Seuraava
                </Button>
            </Stack>
        </form>
    )
}