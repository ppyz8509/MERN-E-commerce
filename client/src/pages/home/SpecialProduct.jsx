import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../Components/Card";

const SempleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" /*background: "red"*/ }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SemplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" /*background: "green"*/ }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialProduct = () => {
  const [products, setProducts] = useState([]);
  const slider = useRef(null);
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setProducts(specials);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay speed in milliseconds (e.g., 3 seconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SempleNextArrow />,
    prevArrow: <SemplePrevArrow />,
  };
  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Items</p>
        <h2 className="title">Standout Item from Our Product</h2>
      </div>
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          className="btn bg-red p-2 rounded-full ml-5 text-white"
          onClick={() => slider?.current?.slickPrev()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-6 p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button
          className="btn bg-red p-2 rounded-full ml-5 text-white"
          onClick={() => slider?.current?.slickNext()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-6 p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
      <div className="slider-container">
        <Slider ref={slider} {...settings}>
          {products.map((item, i) => (
            <Card item={item} key={i} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialProduct;
