import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
    cloud: {
        cloudName: 'seuraava-askel'
    }
});

type Props = {
    image_id: string
    width: number
    height: number
}
export default function CloudImage({ image_id, width, height }: Props) {
    const myImage = cld.image(image_id);

    myImage.resize(fill().width(width).height(height));

    // Render the image in a React component.
    return (
        <AdvancedImage cldImg={myImage} style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
    )
}