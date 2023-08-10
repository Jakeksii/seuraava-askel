//https://www.embla-carousel.com/
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import CarouselImage from './CarouselImage'

const autoplayOptions = {
    delay: 10000
}

const style = {
    embla: {
        overflow: "hidden",
      },
      embla__container: {
        display: "flex"
      },
      embla__slide: {
        flex: "0 0 100%",
        textAling: "center"
      }
  }

const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay(autoplayOptions)])

  return (
    <div style={style.embla} className="embla" ref={emblaRef}>
      <div style={style.embla__container} className="embla__container">
        <div style={style.embla__slide} className="embla__slide ml-2"><CarouselImage imageID='df1hlp0xwczdjf13mzbw' /></div>
        <div style={style.embla__slide} className="embla__slide ml-2"><CarouselImage imageID='df1hlp0xwczdjf13mzbw' /></div>
        <div style={style.embla__slide} className="embla__slide ml-2"><CarouselImage imageID='df1hlp0xwczdjf13mzbw' /></div>
      </div>
    </div>
  )
}

export default EmblaCarousel
