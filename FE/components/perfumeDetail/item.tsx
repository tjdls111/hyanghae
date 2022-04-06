/*
향수 상세 페이지의 향수 정보
향수 정보
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-04-06
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./item.module.css";
import Image from "next/image";
import EbayBtn from "./ebayBtn";
import EbayList from "./ebayList";
import { apiShoppingSearch, reviewLike } from "../../api/perfume";
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
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const router = useRouter();

  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const token = useAppSelector((state) => state.authReducer.token);

  useEffect(() => {
    setIsLike(data.like);
    setLikeCnt(data.likeCnt);
  }, [data]);

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
          계절 : {data.season == "0" && "봄🌸/여름🌊"}
          {data.season == "1" && "가을🍁/겨울⛄"}
          {data.season == "2" && "모든 계절"}
        </p>
        <p className={styles.content}>
          상황 : {data.tpo == "0" && "항상"}
          {data.tpo == "1" && "데일리"}
          {data.tpo == "2" && "데이트💜"}
          {data.tpo == "3" && "회사🧐"}
        </p>
        <p className={styles.content}>
          분위기 : {data.mood == "0" && "All"}
          {data.mood == "1" && "활기찬"}
          {data.mood == "2" && "우아한"}
          {data.mood == "3" && "상큼한"}
          {data.mood == "4" && "따듯한"}
        </p>
      </div>
      <div>
        <span className={styles.title}>
          {data.name} | {data.perfumeBrand}
        </span>
        <span className={styles.content}>
          for {data.gender == "0" && "남성"}
          {data.gender == "1" && "여성"}
          {data.gender == "2" && "모두"}
        </span>
        <p className={styles.content}>
          점수 : {data.score}/5 ({data.reviewCnt} 표)
        </p>
        <p className={styles.content}>
          #{data.note1} #{data.note2} #{data.note3}
        </p>
        <p className={styles.content}>{likeCnt} 명이 이 향수를 좋아합니다.</p>
        {isAuthenticated && (
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
        )}
        {lists && <EbayList lists={lists} />}

        <EbayBtn keyword={data.name} />
      </div>
    </main>
  );
};

export default Item;
