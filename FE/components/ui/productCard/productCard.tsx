import React from "react";
import Image from "next/image";
import styles from "./productCard.module.css";
import { product } from "../../bestProduct/dummyData";
import Star from "../../../public/SVG/star_rate.svg";

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
            <p className={styles.ratingText}>{product.rating}</p>
          </div>

          <div className={styles.brand}>{product.brand}</div>
        </div>
        <div className={styles.descriptionRow2}>
          <div className={styles.title}>{product.name}</div>
        </div>
        <div className={styles.descriptionRow3}>
          <p>{`#${product.note1}`}</p>
          <p>{`#${product.note2}`}</p>
          <p>{`#${product.note3}`}</p>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
