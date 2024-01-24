import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { SxProps } from "@mui/material";
import { useMemo } from "react";

type Props = {
    image_id: string
    aspectRatio?: number
    sx?: SxProps
}

export const Image = ({ image_id, aspectRatio, sx }: Props) => {

    // Memoize the CloudinaryImage instance to avoid unnecessary re-renders
    const image = useMemo(() => {
        const img = new CloudinaryImage(image_id, { cloudName: "dcjfcrgvu" });
        img.resize(fill().aspectRatio(aspectRatio ?? 1/1).gravity('auto'));
        img.format('webp');
        return img;
    }, [image_id, aspectRatio]);
    
    return (
        <AdvancedImage cldImg={image} style={{...sx}} plugins={[responsive({steps: 200}), placeholder({mode: 'vectorize'})]}/>
    )
}