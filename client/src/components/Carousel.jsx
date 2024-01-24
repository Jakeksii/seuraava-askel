import { Box, styled } from "@mui/material";
import Slider from "react-slick";
import "~slick-carousel/slick/slick-theme.css";
import "~slick-carousel/slick/slick.css";
import { Image } from "./Image";

const data = [
    { image_id: '/App/Banner_labbqq' },
    { image_id: 'df1hlp0xwczdjf13mzbw' }
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

export default function Carousel() {
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
        <Box sx={{ p:1, aspectRatio: '21/9', width: '100%', m: 'auto' }}>
            <StyledSlider {...settings}>
                {
                    data.map((image, i) => {
                        return <Image key={i} image_id={image.image_id} aspectRatio={21/9} sx={{ borderRadius: '5px' }} />
                    })
                }
            </StyledSlider>
        </Box>
    )
}