import React from "react";
import { reviewType } from "../../recentReviews/dummyData";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ReviewCard from "../reviewCard/reviewCard";
import LeftArrow from "../../../public/SVG/circle-left.svg";
import RightArrow from "../../../public/SVG/circle-right.svg";

const ReviewSlider: React.FC<{ slideItems: reviewType[] }> = ({
  slideItems,
}) => {
  const swiper = new Swiper(".product-swiper-container", {
    modules: [Navigation],
    slidesPerView: 2,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next-unique",
      prevEl: ".swiper-button-prev-unique",
    },
  });

  return (
    <div className="product-swiper-container">
      <h1 className="swiper-heading">Recent Reviews</h1>
      <div className="swiper-wrapper">
        {slideItems.map((item) => (
          <div className="swiper-slide">
            <ReviewCard review={item} key={item.name} />
          </div>
        ))}
      </div>
      <div className="swiper-navigation-container">
        <LeftArrow className="swiper-button-prev-unique" />
        <RightArrow className="swiper-button-next-unique" />
      </div>
    </div>
  );
};

export default ReviewSlider;
