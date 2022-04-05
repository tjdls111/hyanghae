import React, { useEffect, useState } from "react";
import ProductSlider from "../ui/slider/productSlider";
import { DUMMY_DATA } from "./dummyData";
import styles from "./bestProducts.module.css";
import { getBestPerfumes } from "../../api/bestPerfume";
import { product } from "perfume";

const BestProducts: React.FC = () => {
  const [bestPerfumes, setBestPerfumes] = useState<product[] | null>(null);

  console.log(bestPerfumes);

  useEffect(() => {
    getBestPerfumes().then((data) => setBestPerfumes(data.perfumeList));
  }, []);

  return (
    <section className={styles.container}>
      <ProductSlider
        header={"BEST 10"}
        slideItems={bestPerfumes}
      ></ProductSlider>
    </section>
  );
};

export default BestProducts;
