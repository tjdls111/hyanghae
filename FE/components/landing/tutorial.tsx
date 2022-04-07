/*
랜딩페이지 튜토리얼
랜딩페이지 튜토리얼 tsx
@author Jackson
@version 1.0.0
생성일 2022-03-10
마지막 수정일 2022-03-14
*/

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
              향해는 1000여 가지가 넘는 향수의 데이터를 축적하고 있습니다. 수
              많은 향수 중에서 여러분만의 향수를 찾아보세요
            </p>
          </div>

          <div className={styles.stepTextBox}>
            <p className={styles.stepNumber}>02</p>
            <p className={styles.stepHeading}>추천 시스템</p>
            <p className={styles.stepDescription}>
              오직 당신만을 위한 향기를 찾아드립니다. 라이프스타일, 패션, 기존에
              쓰고 있던 제품에 기반하여 꼭 맞는 향수를 추천해드립니다.
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
              향해는 신뢰도가 높은 리뷰와 평점 시스템을 제공합니다. 단순히
              향수의 데이터베이스가 아니라, 향수의 커뮤니티를 지향합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tutorial;
