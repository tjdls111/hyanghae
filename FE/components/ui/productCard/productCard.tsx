import React from "react";
import Image from "next/image";
import styles from "./productCard.module.css";
import { product } from "../../bestProduct/dummyData";

const ProductCard: React.FC<{ product: product }> = ({ product }) => {
  return (
    <div>
      <div className={styles.imageWrapper}>
        <Image src={product.imgUrl} layout="fill" className={styles.image} />
      </div>
    </div>
  );
};

export default ProductCard;
