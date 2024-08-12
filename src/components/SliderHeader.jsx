import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselHeader from './CarouselHeader';

export default function SliderHeader() {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "red", marginRight: "40px" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "red", marginLeft: "40px", zIndex: "5" }}
            onClick={onClick}
          />
        );
      }
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
        // autoplaySpeed: 2000,
        // cssEase: "linear"
    };
    return (
        <div className="mx-0 px-0">
            <Slider {...settings}>
                <CarouselHeader title="The Best Places Are Waiting For You" image="/mountain.webp" />
                <CarouselHeader title="Travel Beautiful Land For Adventure" image="/03.webp" />
                <CarouselHeader title="Let's Make Your Best Trip With Us" image="/02.webp" />
            </Slider>
        </div>
  )
}
