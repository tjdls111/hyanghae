import React, { useEffect } from "react";
import styles from "./surv2PerfumeResult.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { refreshTitle } from "../../../../reducers/titleSlice";
interface propType {
  brand: string;
  name: string;
  id: number;
  url: string;
}

const Surv2PerfumeResult = ({ brand, name, id, url }: propType) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const forDetail = () => {
    dispatch(refreshTitle());
    router.replace(`/perfume/${id}`);
  };
  return (
    <>
      <div className={styles.resultList}>
        <div className={styles.resultImageWrapper}>
          <Image alt="perfumeImg" src={url} objectFit="contain" layout="fill"></Image>
        </div>

        <div className={styles.informWrapper}>
          <div className={styles.brandName}>{brand}</div>
          <div className={styles.perfumeEllipsis}>{name}</div>
          <div className={styles.detailButton}>
            <button type="button" onClick={forDetail}>
              향수 상세보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Surv2PerfumeResult;
