import React from "react";
import Image from "next/image";
import styles from "./productCard.module.css";
import Star from "../../../public/SVG/star_rate.svg";
import { product } from "perfume";

const ProductCard: React.FC<{ product: product }> = ({ product }) => {
  return (
    <div className={styles.productCardContainer}>
      <section className={styles.imageWrapper}>
        <Image src={product.imgUrl} layout="fill" className={styles.image} />
      </section>
      <section className={styles.description}>
        <div className={styles.descriptionRow1}>
          <div className={styles.rating}>
            <Star className={styles.ratingIcon} />
            <p className={styles.ratingText}>{product.perfumeScore}</p>
          </div>

          <div className={styles.brand}>{product.perfumeBrand.brandName}</div>
        </div>
        <div className={styles.descriptionRow2}>
          <div className={styles.title}>{product.perfumeName}</div>
        </div>
        <div className={styles.descriptionRow3}>
          <p className={styles.note}>{`#${product.note1}`}</p>
          <p className={styles.note}>{`#${product.note2}`}</p>
          <p className={styles.note}>{`#${product.note3}`}</p>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
