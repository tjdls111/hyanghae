import React from "react";
import ProductSlider from "../ui/slider/productSlider";
import { DUMMY_DATA } from "./dummyData";
import styles from "./bestProducts.module.css";

const BestProducts: React.FC = () => {
  return (
    <section className={styles.container}>
      <ProductSlider header={"BEST 10"} slideItems={DUMMY_DATA}></ProductSlider>
    </section>
  );
};

export default BestProducts;
