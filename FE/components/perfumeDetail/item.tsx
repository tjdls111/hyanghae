/*
향수 상세 페이지의 향수 정보
향수 정보
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-23
*/

import React, { useEffect, useState } from "react";
import styles from "./item.module.css";
import Image from "next/image";
import EbayBtn from "./ebayBtn";
import EbayList from "./ebayList";
import { apiShoppingSearch } from "../../api/perfume";

interface InnerProps {
  data: {
    name: string;
    score: string;
    price: string;
    note: string;
    season: string;
    style: string;
  };
}

interface Item {
  itemId: string;
  title: string;
  image: {
    imageUrl: string;
  };
  price: {
    value: string;
    currency: string;
  };
  itemHref: string;
  itemWebUrl: string;
}
const Item = ({ data }: InnerProps) => {
  const [lists, setLists] = useState([] as Array<Item>);

  useEffect(() => {
    // 이베이 쇼핑 검색 api 로 검색 결과 가져오기
    apiShoppingSearch(data.name)
      .then((res) => {
        setLists(res.data.itemSummaries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  let myLoader;

  useEffect(() => {
    if (lists) {
      myLoader = () => {
        return `${lists[0].image?.imageUrl}`;
        // return `https://i.ebayimg.com/thumbs/images/g/k8cAAOSwccRg8j3m/s-l225.jpg`;
      };
    }
    // if (lists && lists.length > 0) {
    //   console.log(lists);
    // }
  }, [lists]);

  return (
    <main className={styles.container}>
      <div>
        <div className={styles.imageContainer}>
          {myLoader && (
            <Image
              className={styles.image}
              loader={myLoader}
              src="img"
              alt="perfume image"
              layout="fill"
            />
          )}
          {lists && lists.length > 0 && (
            <img src={`${lists[0]?.image?.imageUrl}`} />
          )}
        </div>
        <p>Seasonal: {data.season}</p>
        <p>Style: {data.style}</p>
      </div>
      <div>
        <h1>{data.name}</h1>
        <h2>(Score: {data.score})</h2>
        <h2>Note: {data.note}</h2>
        {lists && <EbayList lists={lists} />}
        <EbayBtn keyword={data.name} />
      </div>
    </main>
  );
};

export default Item;
