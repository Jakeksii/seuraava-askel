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
    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image(image_id);

    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    myImage.resize(fill().width(width).height(height));

    // Render the image in a React component.
    return (
        <AdvancedImage cldImg={myImage}/>
    )
}