import React from "react";
import { product } from "../../bestProduct/dummyData";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../productCard/productCard";
import LeftArrow from "../../../public/SVG/circle-left.svg";
import RightArrow from "../../../public/SVG/circle-right.svg";

const Slider: React.FC<{ slideItems: product[]; header: string }> = ({
  slideItems,
  header,
}) => {
  const swiper = new Swiper(".swiper-container", {
    modules: [Navigation, Pagination],
    slidesPerView: 4,
    direction: "horizontal",
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next-unique",
      prevEl: ".swiper-button-prev-unique",
    },
  });

  return (
    <>
      <div className="swiper-container">
        <h1 className="swiper-heading">{header}</h1>
        <div className="swiper-wrapper">
          {slideItems.map((item) => (
            <div className="swiper-slide">
              <ProductCard key={item.name} product={item} />
            </div>
          ))}
        </div>
        <div className="swiper-navigation-container">
          <LeftArrow className="swiper-button-prev-unique" />
          <RightArrow className="swiper-button-next-unique" />
        </div>
      </div>
    </>
  );
};

export default Slider;
