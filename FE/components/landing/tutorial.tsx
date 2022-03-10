import React from "react";
import styles from "./tutorial.module.css";
import Image from "next/image";

const Tutorial = () => {
  return (
    <>
      <section className={styles.tutorial}>
        <div className={styles.introBox}>
          <span className={styles.subHeading}>How it works</span>
          <h2 className={styles.mainHeading}>향해를 제대로 즐기는 방법</h2>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepImgBox}>
            <Image
              className={styles.stepImg}
              layout="fill"
              src="/images/step01.jpg"
            />
          </div>
          <div className={styles.stepTextBox}>
            <p className={styles.stepNumber}>01</p>
            <p className={styles.stepHeading}>1000여 가지가 넘는 향수</p>
            <p className={styles.stepDescription}>
              향해는 1000여 가지가 넘는 향수 중에서 당신에게 꼭 맞는 향수를
              추천해 드립니다. 당신의 패션, 라이프스타일, 그리고 무드에 꼭 맞는
              향수를 향해에서 찾아보세요.
            </p>
          </div>

          <div className={styles.stepTextBox}>
            <p className={styles.stepNumber}>02</p>
            <p className={styles.stepHeading}>전문 조향사</p>
            <p className={styles.stepDescription}>
              오직 당신만을 위한 향기를 찾아드립니다. 향해에는 전문 조향사들이
              상시 대기하고 있습니다. 뭐든지 물어보세요!
            </p>
          </div>
          <div className={styles.stepImgBox}>
            <Image
              className={styles.stepImg}
              layout="fill"
              src="/images/step02.jpg"
            />
          </div>

          <div className={styles.stepImgBox}>
            <Image
              className={styles.stepImg}
              layout="fill"
              src="/images/step03.jpg"
            />
          </div>
          <div className={styles.stepTextBox}>
            <p className={styles.stepNumber}>03</p>
            <p className={styles.stepHeading}>리뷰와 평점 시스템</p>
            <p className={styles.stepDescription}>
              향해는 신뢰도가 높은 리뷰와 평점 시스템을 제공합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tutorial;
