import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./newHomePageBanner.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const NewHomePageBanner: React.FC = () => {
  const router = useRouter();

  const handleFirstButtonClick = function () {
    router.push("/perfumes");
  };

  const handleSecondButtonClick = function () {
    router.push("/survey");
  };

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className={styles.container}>
            <div className={styles.imageWrapper}>
              <h2 className={styles.title}>어떤 향수를 써야할지 모르겠나요?</h2>
              <Image
                className={styles.firstImage}
                layout="fill"
                src="/images/homePage-Banner/firstImage.webp"
                alt="image of various perfumes"
              />
              <button
                onClick={handleFirstButtonClick}
                className={styles.descriptionBtn}
              >
                만족도 높은 향수 보러 가기
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.container}>
            <div className={styles.gridLayout}>
              <div className={styles.secondImageWrapper}>
                <Image
                  className={styles.secondImage}
                  layout="fill"
                  src="/images/homePage-Banner/secondImage.png"
                  alt="image of various perfumes"
                />
              </div>
              <div className={styles.descriptionBox}>
                <h2 className={styles.secondTitle}>
                  나 한테 딱 맞는 향수 어디 없을까?
                </h2>
                <p className={styles.description}>
                  나의 패션, 라이프스타일, 관심사에 따라 향수를 찾아보세요.
                  향수만큼 취향을 타는 것도 없어요!
                </p>
                <button
                  onClick={handleSecondButtonClick}
                  className={styles.secondDescriptionBtn}
                >
                  향수 추천 받기
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default NewHomePageBanner;
