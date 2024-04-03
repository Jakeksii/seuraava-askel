import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteImages } from "src/hooks/api-hooks/useImages";
import { CircularProgress } from "@mui/material";

export default function DeleteImageButton({ image_id }: { image_id: string }) {
    const {mutate, isLoading} = useDeleteImages()

    const deleteImage = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutate([image_id] as any)
    }
    if(isLoading) return <CircularProgress />

    return (
        <IconButton onClick={deleteImage}>
            <DeleteIcon />
        </IconButton>
    )
}