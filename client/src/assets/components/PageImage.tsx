import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CLOUDINARY_CLOUDNAME } from "../constants";

interface Props {
    image_id: string, width: number, height: number
}
export const PageImage = (props: Props) => {
    const image = new CloudinaryImage(props.image_id, { cloudName: CLOUDINARY_CLOUDNAME })
        .resize(
            fill()
                .gravity("auto")
                .width(props.width)
                .height(props.height)
        )
    return <AdvancedImage cldImg={image} className={"m-auto rounded-none md:rounded-b-2xl"} />
}