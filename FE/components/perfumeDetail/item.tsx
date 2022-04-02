/*
향수 상세 페이지의 향수 정보
향수 정보
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-23
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./item.module.css";
import Image from "next/image";
import EbayBtn from "./ebayBtn";
import EbayList from "./ebayList";
import {
  apiShoppingSearch,
  reviewLike,
  updateEbayKey,
} from "../../api/perfume";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../reducers/hooks";

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
  const [isLike, setIsLike] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.authReducer.ebayApi);
  const token = useAppSelector((state) => state.authReducer.token);

  const onLike = () => {
    const perfumeId = Number(router.query.id as string);
    // setIsLike 부분은 추후에 변경해야 함!!! (실제로 좋아요 여부를 반영해야 함.)
    reviewLike(token, perfumeId).finally(() => {
      setIsLike(!isLike);
    });
  };

  updateEbayKey().then((res) => {
    console.log(res);
  });
  // dispatch(updateEbayKey)

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
      };
    }
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
          {lists.length == 0 && (
            <div className={styles.imageContainer}>
              <Image layout="fill" src="/images/perfume.jpg" />
            </div>
          )}
        </div>
        <p>Seasonal: {data.season}</p>
        <p>Style: {data.style}</p>
      </div>
      <div>
        <h1>{data.name}</h1>
        <h2>(Score: {data.score})</h2>
        <h2>Note: {data.note}</h2>
        {isLike && (
          <button onClick={onLike}>
            <h1>🧡</h1>
          </button>
        )}
        {!isLike && (
          <button onClick={onLike}>
            <h1>🤍</h1>
          </button>
        )}
        {lists && <EbayList lists={lists} />}

        <EbayBtn keyword={data.name} />
      </div>
    </main>
  );
};

export default Item;
