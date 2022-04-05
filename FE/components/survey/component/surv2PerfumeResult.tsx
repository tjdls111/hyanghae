import React from "react";
import styles from "./surv2PerfumeResult.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
interface propType {
  brand: string;
  name: string;
  id: number;
  url: string;
}

const Surv2PerfumeResult = ({ brand, name, id, url }: propType) => {
  const router = useRouter();
  const forDetail = () => {
    router.replace(`/perfume/${id}`);
  };
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
              <div className={styles.detailButton}>
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
