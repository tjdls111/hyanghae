/*
이미지 슬라이더(캐로우셀)$
이미지 슬라이더(캐로우셀)
@author Jackson$
@version 1.0.0
생성일 2022-03-24$
마지막 수정일 2022-03-24$
*/
import React, { useEffect, useState } from "react";
import styles from "./imageSlider.module.css";
import Image from "next/image";
import sliderData from "./sliderData";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ImageSlider: React.FC = function () {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  const nextSlide = function () {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = function () {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    setTimeout(nextSlide, 7000);
  }, [current]);

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

export default ImageSlider;
