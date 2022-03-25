/*
향수 상세 페이지의 ebay 검색 결과
검색 결과
@author Wendy
@version 1.0.0
생성일 2022-03-24
마지막 수정일 2022-03-25
*/

import React from "react";
import Link from "next/link";
import styles from "./ebayList.module.css";
interface Props {
  itemId: string;
  title: string;
  image: {
    image: string;
  };
  price: {
    value: string;
  };
  itemWebUrl: string;
}

function EbayList({ lists }) {
  return (
    <section>
      <ul>
        {lists.map((list) => (
          <div key={list.itemId}>
            <h2>
              {list.title} ({list.price.value} $){"    "}
              <Link href={list.itemWebUrl}>
                <button className={styles.btn}>Buy</button>
              </Link>
            </h2>
          </div>
        ))}
      </ul>
    </section>
  );
}

export default EbayList;
