import React from "react";
import { product } from "../../bestProduct/dummyData";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../productCard/productCard";
import LeftArrow from "../../../public/SVG/circle-left.svg";
import RightArrow from "../../../public/SVG/circle-right.svg";

const ProductSlider: React.FC<{ slideItems: product[]; header: string }> = ({
  slideItems,
  header,
}) => {
  const swiper = new Swiper(".product-swiper-container", {
    modules: [Navigation],
    slidesPerView: 4,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next-unique",
      prevEl: ".swiper-button-prev-unique",
    },
  });

  return (
    <>
      <div className="product-swiper-container">
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

export default ProductSlider;
