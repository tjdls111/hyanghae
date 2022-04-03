import React from "react";
import styles from "./seasonalProduct.module.css";
import Slider from "../ui/slider/slider";
import { DUMMY_DATA } from "./dummyData";

const SeasonalProduct: React.FC = () => {
  return (
    <section className={styles.container}>
      <Slider header={"봄에 어울리는 향수"} slideItems={DUMMY_DATA}></Slider>
    </section>
  );
};

export default SeasonalProduct;
