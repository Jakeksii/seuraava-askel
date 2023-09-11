//https://www.embla-carousel.com/
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { fill } from "@cloudinary/url-gen/actions/resize"

const autoplayOptions = {
    delay: 10000
}

const style = {
    embla: {
        overflow: "hidden",
        margin: "6px"
      },
      embla__container: {
        display: "flex"
      },
      embla__slide: {
        flex: "0 0 100%",
        textAling: "center"
      }
  }

  const CarouselImage = ({image_id} : {image_id: string}) => {
    const image = new CloudinaryImage(image_id, { cloudName: "dcjfcrgvu" }).resize(fill().gravity("auto").width(1640).height(700)) 
    return (
        <AdvancedImage className={"ml-auto mr-auto overflow-clip- overflow-clip rounded-md"} cldImg={image} />
    )
}

export default function EmblaCarousel () {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay(autoplayOptions)])

  return (
    <div style={style.embla} className="embla rounded-md" ref={emblaRef}>
      <div style={style.embla__container} className="embla__container">
        <div style={style.embla__slide} className="embla__slide ml-2"><CarouselImage image_id='/App/Banner_labbqq' /></div>
        <div style={style.embla__slide} className="embla__slide ml-2"><CarouselImage image_id='df1hlp0xwczdjf13mzbw' /></div>
        <div style={style.embla__slide} className="embla__slide ml-2"><CarouselImage image_id='df1hlp0xwczdjf13mzbw' /></div>
      </div>
    </div>
  )
}