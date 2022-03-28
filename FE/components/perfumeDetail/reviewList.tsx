/*
리뷰 리스트
리뷰 리스트
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-28
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiGetPerfumeReview } from "../../api/perfume";
import styles from "./reviewList.module.css";

interface Review {
  reviewContent: string;
  reviewScore: number;
  userNickname: string;
}
const ReviewList = () => {
  const [data, setData] = useState([] as Array<Review>);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      apiGetPerfumeReview(router.query.id as string)
        .then((res) => {
          console.log(res);
          setData(res.data.reviewList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  return (
    <article className={styles.container}>
      <h1>Review</h1>
      <ul>
        {data &&
          data.map((d) => (
            <li key={d.userNickname}>
              {d.userNickname} : {d.reviewContent}
            </li>
          ))}
      </ul>
    </article>
  );
};

export default ReviewList;
