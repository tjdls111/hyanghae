import React from "react";
import styles from "./reviewCard.module.css";
import { reviewType } from "../../recentReviews/dummyData";
import Image from "next/image";
import Star from "../../../public/SVG/star_rate.svg";

const ReviewCard: React.FC<{ review: reviewType }> = ({ review }) => {
  return (
    <div className={styles.container}>
      <section className={styles.productInfo}>
        <div className={styles.productImgWrapper}>
          <Image src={review.imgUrl} layout="fill" />
        </div>
        <div className={styles.productText}>
          <p className={styles.productName}>{review.name}</p>
          <p className={styles.productBrand}>{review.brand}</p>
        </div>
      </section>
      <section className={styles.reviewInfo}>
        <div className={styles.reviewHeader}>
          <div className={styles.rating}>
            <Star className={styles.ratingIcon} />
            <p className={styles.ratingText}>{review.rating}</p>
          </div>
          <p className={styles.userNickname}>{review.nickname}</p>
        </div>
        <div className={styles.reviewContent}>{review.content}</div>
      </section>
    </div>
  );
};

export default ReviewCard;
