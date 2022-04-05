import React from "react";
import styles from "./resultBox.module.css";
import Image from "next/image";
interface propType {
  img: string;
  name: string;
  id: number;
  setData: (data: rstBoxType) => void;
  setClick: (data: boolean) => void;
}
export interface rstBoxType {
  selectId: number;
  name: string;
  url: string;
}

const ResultBox = (prop: propType) => {
  const { img, name, id, setData, setClick } = prop;
  return (
    <>
      <div className={styles.outer}>
        <button
          type="button"
          onClick={() => {
            setData({
              selectId: id,
              name,
              url: img,
            });
            setClick(true);
          }}
          className={styles.container}
        >
          <div className={styles.imageWrapper}>
            <Image alt="perfumeImg" src={prop.img} objectFit="contain" layout="fill"></Image>
          </div>
          <div className={styles.imageName}>{prop.name}</div>
        </button>
      </div>
    </>
  );
};

export default ResultBox;
