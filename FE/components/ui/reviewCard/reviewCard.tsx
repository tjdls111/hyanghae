import React from "react";
import styles from "./reviewCard.module.css";
import Image from "next/image";
import Star from "../../../public/SVG/star_rate.svg";
import { reviewType } from "perfume";

const ReviewCard: React.FC<{ review: reviewType }> = ({ review }) => {
  return (
    <div className={styles.container}>
      <section className={styles.productInfo}>
        <div className={styles.productImgWrapper}>
          <Image
            className={styles.productImg}
            src={review.imgUrl}
            layout="fill"
          />
        </div>
        <div className={styles.productText}>
          <p className={styles.productName}>{review.perfumeName}</p>
          <p className={styles.productBrand}>{review.perfumeBrand}</p>
        </div>
      </section>
      <section className={styles.reviewInfo}>
        <div className={styles.reviewHeader}>
          <div className={styles.rating}>
            <Star className={styles.ratingIcon} />
            <p className={styles.ratingText}>{review.reviewScore}</p>
          </div>
          <p className={styles.userNickname}>{review.userNickname}</p>
        </div>
        <div className={styles.reviewContent}>{review.reviewContent}</div>
      </section>
    </div>
  );
};

export default ReviewCard;
