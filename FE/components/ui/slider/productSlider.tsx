import React from "react";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../productCard/productCard";
import LeftArrow from "../../../public/SVG/circle-left.svg";
import RightArrow from "../../../public/SVG/circle-right.svg";
import { product } from "perfume";

const ProductSlider: React.FC<{
  slideItems: product[] | null;
  header: string;
}> = ({ slideItems, header }) => {
  const swiper = new Swiper(".product-swiper-container", {
    modules: [Navigation],
    slidesPerView: 2,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next-unique",
      prevEl: ".swiper-button-prev-unique",
    },
    breakpoints: {
      800: {
        slidesPerView: 3,
      },

      1000: {
        slidesPerView: 4,
      },
    },
  });

  return (
    <>
      <div className="product-swiper-container">
        <h1 className="swiper-heading">{header}</h1>
        <div className="swiper-wrapper">
          {slideItems === null
            ? null
            : slideItems.map((item) => (
                <div className="swiper-slide">
                  <ProductCard key={item.perfumeName} product={item} />
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
