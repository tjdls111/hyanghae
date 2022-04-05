import React from "react";
import styles from "./seasonalProducts.module.css";
import ProductSlider from "../ui/slider/productSlider";
import { DUMMY_DATA } from "./dummyData";

const SeasonalProduct: React.FC = () => {
  return (
    <section className={styles.container}>
      <ProductSlider
        header={"봄에 어울리는 향수"}
        slideItems={DUMMY_DATA}
      ></ProductSlider>
    </section>
  );
};

export default SeasonalProduct;
