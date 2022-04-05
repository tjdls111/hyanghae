/*
향수 상세 페이지의 향수 정보
향수 정보
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-04-05
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./item.module.css";
import Image from "next/image";
import EbayBtn from "./ebayBtn";
import EbayList from "./ebayList";
import { apiShoppingSearch, reviewLike } from "../../api/perfume";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../reducers/hooks";

interface InnerProps {
  data: {
    name: string;
    score: string;
    price: string;
    season: string;
    style: string;
    likeCnt: number;
    gender: string;
    imgUrl: string;
    mood: string;
    note1: string;
    note2: string;
    note3: string;
    perfumeBrand: string;
    tpo: string;
    reviewCnt: string;
    like: boolean;
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
  const [isLike, setIsLike] = useState(data.like || false);
  const [likeCnt, setLikeCnt] = useState(data.likeCnt || 0);
  const router = useRouter();

  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.authReducer.ebayApi);
  const token = useAppSelector((state) => state.authReducer.token);

  const onLike = () => {
    const perfumeId = Number(router.query.id as string);
    reviewLike(token, perfumeId)
      .then((res) => {
        if (res?.data?.message === "좋아요 해제") {
          setLikeCnt(likeCnt === 0 ? 0 : likeCnt - 1);
        } else {
          setLikeCnt(likeCnt + 1);
        }
      })
      .finally(() => {
        setIsLike(!isLike);
      });
  };

  useEffect(() => {
    if (data.name) {
      // 쇼핑 검색 api 로 검색 결과 가져오기
      apiShoppingSearch(data.name)
        .then((res) => {
          setLists(res.data.itemSummaries);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  let myLoader;

  useEffect(() => {
    if (lists) {
      myLoader = () => {
        return `${data.imgUrl}`;
      };
    }
  }, [lists]);

  return (
    <main className={styles.container}>
      <div>
        {data.imgUrl && (
          <div className={styles.imageContainer}>
            <Image layout="fill" src={data.imgUrl} />
          </div>
        )}
        {!data.imgUrl && (
          <div className={styles.imageContainer}>
            <Image layout="fill" src="/images/perfume.jpg" />
          </div>
        )}
        <p className={styles.content}>
          Seasonal : {data.season == "0" && "Spring🌸/Summer🌊"}
          {data.season == "1" && "Fall🍁/Winter⛄"}
          {data.season == "2" && "All Season"}
        </p>
        <p className={styles.content}>
          TPO : {data.tpo == "0" && "All situation"}
          {data.tpo == "1" && "Daily"}
          {data.tpo == "2" && "Date💜"}
          {data.tpo == "3" && "Interview🧐"}
        </p>
        <p className={styles.content}>
          Mood : {data.mood == "0" && "All"}
          {data.mood == "1" && "Lively"}
          {data.mood == "2" && "Elegant"}
          {data.mood == "3" && "Fresh"}
          {data.mood == "4" && "Warm"}
        </p>
      </div>
      <div>
        <span className={styles.title}>
          {data.name} | {data.perfumeBrand}
        </span>
        <span className={styles.content}>
          for {data.gender == "0" && "Male"}
          {data.gender == "1" && "Female"}
          {data.gender == "2" && "All"}
        </span>
        <p className={styles.content}>
          Score : {data.score}/5 with {data.reviewCnt} votes.
        </p>
        <p className={styles.content}>
          Notes: {data.note1}, {data.note2}, {data.note3}
        </p>
        <p className={styles.content}>{likeCnt} people likes this item.</p>
        <div className={styles.btnContainer}>
          {isLike && (
            <button className={styles.btn} onClick={onLike}>
              <h1>🧡</h1>
            </button>
          )}
          {!isLike && (
            <button className={styles.btn} onClick={onLike}>
              <h1>🤍</h1>
            </button>
          )}
        </div>
        {lists && <EbayList lists={lists} />}

        <EbayBtn keyword={data.name} />
      </div>
    </main>
  );
};

export default Item;
