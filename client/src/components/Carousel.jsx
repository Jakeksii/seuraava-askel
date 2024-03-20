import { Box, styled } from "@mui/material";
import Slider from "react-slick";
import { useIsMobile } from "src/hooks/useResponsive";
import "~slick-carousel/slick/slick-theme.css";
import "~slick-carousel/slick/slick.css";
import { Image } from "./Image";

const data = [
    { image_id: '/App/Banner_labbqq' },
    { image_id: 'df1hlp0xwczdjf13mzbw' },
]

const StyledSlider = styled(Slider)({
    width: '100%',
    height: '100%',
    'div': {
        width: '100%',
        height: '100%'
    },
    'img': {
        width: '100%',
        height: '100%',
        margin: 'auto'
    }
})

const ratios = {
    tiny: {
        number: 16/9,
        string: '16/9'
    },
    default: {
        number: 21/9,
        string: '21/9'
    }
}

export default function Carousel() {
    const isMobile = useIsMobile()
    const aspect = isMobile ? ratios.tiny : ratios.default

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        lazyLoad: true,
    }

    return (
        <Box sx={{ pb: 1, aspectRatio: aspect.string, width: '100%', m: 'auto' }}>
            <StyledSlider {...settings}>
                {
                    data.map((image, i) => {
                        return <Image key={i} image_id={image.image_id} aspectRatio={aspect.number} sx={{ ...(!isMobile && {borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px'}) }} />
                    })
                }
            </StyledSlider>
        </Box>
    )
}