import React from 'react';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import CardTestimonial from './CardTestimonial.jsx';

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="lg:px-24">
            <Slider {...settings}>
                <CardTestimonial name="Pedro Cespedes" text="I love the fitness apparel and gear I purchased from this site. The quality is exceptional and the prices are unbeatable." />
                
                <CardTestimonial name="Piero Gamarra" text="I love the fitness apparel and gear I purchased from this site. The quality is exceptional and the prices are unbeatable." />
                
                <CardTestimonial name="Joe Biden" text="I love the fitness apparel and gear I purchased from this site. The quality is exceptional and the prices are unbeatable." />
                
                <CardTestimonial name="Cristian Reyes" text="I love the fitness apparel and gear I purchased from this site. The quality is exceptional and the prices are unbeatable." />
                
                <CardTestimonial name="Donald Trump" text="I love the fitness apparel and gear I purchased from this site. The quality is exceptional and the prices are unbeatable." />
                
                <CardTestimonial name="Elon Musk" text="I love the fitness apparel and gear I purchased from this site. The quality is exceptional and the prices are unbeatable." />
            </Slider>
        </div>
    )
}
