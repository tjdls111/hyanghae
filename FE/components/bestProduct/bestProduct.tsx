import React from "react";
import Slider from "../ui/slider/slider";
import { DUMMY_DATA } from "./dummyData";
import styles from "./bestProduct.module.css";

const BestProduct: React.FC = () => {
  return (
    <section className={styles.container}>
      <Slider slideItems={DUMMY_DATA}></Slider>
    </section>
  );
};

export default BestProduct;
