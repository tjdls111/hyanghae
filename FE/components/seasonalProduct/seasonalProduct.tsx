import React, { useState, useEffect } from "react";
import styles from "./seasonalProducts.module.css";
import ProductSlider from "../ui/slider/productSlider";
import axios from "axios";

const SeasonalProduct: React.FC = () => {
  const [springPerfumes, setSpringPerfumes] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/perfume/season/0")
      .then((res) => setSpringPerfumes(res.data.perfumeList));
  }, []);

  return (
    <section className={styles.container}>
      <ProductSlider
        header={"봄에 어울리는 향수"}
        slideItems={springPerfumes}
      ></ProductSlider>
    </section>
  );
};

export default SeasonalProduct;
