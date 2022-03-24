/*
향수 상세 페이지의 향수 정보
향수 정보
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-23
*/

import React from "react";
import styles from "./item.module.css";
import Image from "next/image";
import EbayBtn from "./ebayBtn";
import EbayList from "./ebayList";

interface InnerProps {
  data: {
    name: string;
    score: string;
    price: string;
    note: string;
    imgPath: string;
    season: string;
    style: string;
  };
}

const Item = ({ data }: InnerProps) => {
  const myLoader = () => {
    return `${data.imgPath}`;
  };

  return (
    <main className={styles.container}>
      <div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            loader={myLoader}
            src="imgPath"
            alt="perfume image"
            layout="fill"
          />
        </div>
        <p>Seasonal: {data.season}</p>
        <p>Style: {data.style}</p>
      </div>
      <div>
        <h1>{data.name}</h1>
        <h2>(Score: {data.score})</h2>
        <h2>Note: {data.note}</h2>
        <EbayList />
        <EbayBtn keyword={data.name} />
      </div>
    </main>
  );
};

export default Item;
