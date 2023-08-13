import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { fill } from "@cloudinary/url-gen/actions/resize"
import { useIsMobile } from "../../hooks/useIsMobile"

type Props = {
    imageID: string
}

const CarouselImage = (props: Props) => {

    const isMobile = useIsMobile();
    const image = isMobile ? 
    new CloudinaryImage(props.imageID, { cloudName: "dcjfcrgvu" })
        .resize(
            fill()
                .gravity("auto")
                .width(820)
                .height(547)
        ) :
    new CloudinaryImage(props.imageID, { cloudName: "dcjfcrgvu" })
    .resize(
        fill()
            .gravity("auto")
            .width(820)
            .height(420)
    )

    return (
        <AdvancedImage className={"ml-auto mr-auto overflow-clip- overflow-clip"} cldImg={image} />
    )
}

export default CarouselImage