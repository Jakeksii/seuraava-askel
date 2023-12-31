import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CLOUDINARY_CLOUDNAME } from "../constants";

interface Props {
    image_id: string,
    width: number,
    height?: number
    className?: string
}
export const PageImage = (props: Props) => {
    const image = new CloudinaryImage(props.image_id, { cloudName: CLOUDINARY_CLOUDNAME })
        .resize(
            fill()
                .gravity("auto")
                .width(props.width)
                .height(props.height ?? Math.round((2 / 3) * props.width))
        )
    return <AdvancedImage cldImg={image} className={props.className} />
}