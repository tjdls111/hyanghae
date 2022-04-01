/*
이미지 슬라이더(캐로우셀)$
이미지 슬라이더(캐로우셀)
@author Jackson$
@version 1.0.0
생성일 2022-03-24$
마지막 수정일 2022-03-24$
*/
import React, { useState } from "react";
import styles from "./homePageBanner.module.css";
import Image from "next/image";
import sliderData from "./homePageBannerData";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomePageBanner: React.FC = function () {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  const nextSlide = function () {
    setCurrent(current === length - 1 ? 0 : current + 1);
    clearInterval(autoRun);
  };

  const prevSlide = function () {
    setCurrent(current === 0 ? length - 1 : current - 1);
    clearInterval(autoRun);
  };

  const autoRun = setInterval(nextSlide, 5000);

  return (
    <section className={styles.carousel}>
      {sliderData.map((data, idx) => {
        return (
          <div
            className={`${styles.imageWrapper} ${
              idx === current && styles.active
            }`}
          >
            {idx === current && (
              <>
                <Image
                  className={`${styles.image} ${
                    idx === current && styles.activeImage
                  }`}
                  width="1000"
                  height="1000"
                  layout="fill"
                  src={data.path}
                  alt="test"
                />
                <h1 className={styles.imgHeader}>{data.header}</h1>
                <button className={styles.descriptionBtn}>
                  {data.description}
                </button>
              </>
            )}
          </div>
        );
      })}

      <ArrowBackIosIcon onClick={prevSlide} className={styles.leftButton}>
        left
      </ArrowBackIosIcon>
      <ArrowForwardIosIcon onClick={nextSlide} className={styles.rightButton}>
        Right
      </ArrowForwardIosIcon>
    </section>
  );
};

export default HomePageBanner;
