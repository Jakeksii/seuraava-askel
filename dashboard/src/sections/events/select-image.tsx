import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CloudImage from "src/components/images/image";
import MediaLibrary from "../media/media-library";
import UploadImages from "../media/upload-images";

type Props = {
    image_id: string
    organization_id: string
    setImage_id: (value: string) => void
    children?: React.ReactNode
}

export default function SelectImage({ image_id, organization_id, setImage_id, children }: Props) {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleSetImage = (image_id: string) => {
        setImage_id(image_id)
        setOpen(false)
    }

    return (
        <>
            <Card
                sx={{ flexGrow: 1, aspectRatio: '1/1', maxWidth: { xs: '100%', sm: '60%', md: '30%' }, mb: { xs: 2, sm: 0 }, p: 0 }}
                component={Button}
                onClick={() => setOpen(true)}
            >
                {(image_id.length === 0) && <Typography variant="h6">Valitse kuva</Typography>}
                {(image_id.length > 0) && <CloudImage image_id={`${organization_id}/${image_id}`} width={400} height={400} />}
                {children}
            </Card>



            <Dialog
                open={open}
                onClose={handleClose}
                scroll="body"
                keepMounted
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        background: 'none',
                        boxShadow: 'none',
                    },
                }}>
                <UploadImages />
                <MediaLibrary setImage_id={handleSetImage} />
            </Dialog>
        </>
    )
}