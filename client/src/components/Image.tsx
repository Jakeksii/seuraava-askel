import { AdvancedImage, placeholder } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CSSProperties, useEffect, useRef, useState } from "react";

type Props = {
    image_id: string
    aspectRatio?: number
    sx?: CSSProperties
}

export const Image = ({ image_id, aspectRatio, sx }: Props) => {
    const [width, setWidth] = useState<number>()
    const ref = useRef<HTMLDivElement>(null);
    const STEP = 100 // resize step
    const MIN_SIZE = 500

    useEffect(() => {
        // Update the state variable when the ref has a current value
        if (ref.current && !width) {
            setWidth(ref.current.offsetWidth)
        }

        const handleResize = () => {
            if(ref.current) {
                const newWidth = ref.current.offsetWidth
                if(width && newWidth > (width + STEP)) {// if new is bigger than old
                    setWidth(newWidth)
                }
                
            }
            
        };

        // Attach resize event listener
        window.addEventListener('resize', handleResize);

        return () => {
            // Detach resize event listener on component unmount
            window.removeEventListener('resize', handleResize);
        };
    }, [ref.current, width]); // Add ref.current as a dependency

    const img_width = Math.max(width??0, MIN_SIZE)
    const img_height = Math.floor(img_width / (aspectRatio ?? 1/1))

    const image = new CloudinaryImage(
        image_id,
        { cloudName: "seuraava-askel" })
        .resize(fill().width(img_width).height(img_height))
        .quality(100)
        .format('webp')

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {width && <AdvancedImage cldImg={image} style={{ ...sx }} plugins={[placeholder({ mode: 'vectorize' })]} />}
        </div>
    )
}