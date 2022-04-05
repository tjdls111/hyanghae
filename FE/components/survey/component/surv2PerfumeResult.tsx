import React from "react";
import styles from "./surv2PerfumeResult.module.css";
import Image from "next/image";
interface propType {
  brand: string;
  name: string;
  note1: string;
  note2: string;
  note3: string;
  url: string;
}

const Surv2PerfumeResult = ({ brand, name, note1, note2, note3, url }: propType) => {
  const forDetail = () => {};
  return (
    <>
      <div className={styles.resultList}>
        <div className={styles.resultWrapper}>
          <div className={styles.resultImgWrapper}>
            <div>
              <Image alt="perfumeImg" src={url} objectFit="contain" layout="fill"></Image>
            </div>

            <div className={styles.informWrapper}>
              <div style={{ marginRight: "1rem" }}>{brand}</div>
              <div style={{ marginRight: "1rem" }}>{name}</div>
              <div style={{ display: "absolute" }}>
                <button type="button" onClick={forDetail}>
                  향수 상세보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Surv2PerfumeResult;
