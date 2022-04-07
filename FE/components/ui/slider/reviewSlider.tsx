import React, { useEffect } from "react";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ReviewCard from "../reviewCard/reviewCard";
import LeftArrow from "../../../public/SVG/circle-left.svg";
import RightArrow from "../../../public/SVG/circle-right.svg";
import { reviewType } from "perfume";

const ReviewSlider: React.FC<{ slideItems: reviewType[] | null }> = ({
  slideItems,
}) => {
  useEffect(() => {
    const reviewSlider = new Swiper(".review-swiper-container", {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 10,
      direction: "horizontal",
      navigation: {
        nextEl: ".swiper-button-next-unique",
        prevEl: ".swiper-button-prev-unique",
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
      },
    });
  }, []);

  return (
    <div className="review-swiper-container">
      <h1 className="swiper-heading">Recent Reviews</h1>
      <div className="swiper-wrapper">
        {slideItems &&
          slideItems.map((item) => (
            <div key={item.reviewContent} className="swiper-slide">
              <ReviewCard review={item} />
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
