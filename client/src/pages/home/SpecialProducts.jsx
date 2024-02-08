import React, { useEffect, useState ,useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "../../components/Card";

const SampleNextArrow = (props) =>{
  const {className, style, onClick} = props;
  return(
    <div className={className}
    style={{...style, display : "block" , background: "red"}}
    onClick={onClick}>
 NEXT
    </div>
  )
}
const SamplePrevArrow = (props) =>{
  const {className, style, onClick} = props;
  return(
    <div className={className}
    style={{...style, display : "block" , background: "green"}}
    onClick={onClick}>
 BACK
    </div>
  )
}

const SpecialProducts = () => {
  const [products, setProduct] = useState([]);
  const slider = useRef(null);
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setProduct(specials);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Item</p>
        <h2 className="title">Standout Items from Our Product</h2>
      </div>
      
      <div className="md:absolute right-3 top-8 mb-10 md:24">
        <button
          className="btn bg-red p-2 rounded-full ml-5 text-white"
          onClick={() => slider?.current?.slickPrev()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7  p-1"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="btn bg-red p-2 rounded-full ml-5 text-white"
          onClick={() => slider?.current?.slickNext()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 p-1"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-10 space-x-5 "
        >
          {products.map((item, i) => (
            <Card item={item} key={i} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialProducts;