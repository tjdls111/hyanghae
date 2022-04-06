/*
리뷰
리뷰 폼
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-04-06
*/

import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { apiPostPerfumeReview, apiPutPerfumeReview } from "../../api/perfume";
import styles from "./review.module.css";
import { useAppSelector } from "../../reducers/hooks";
interface Props {
  star: string;
  content: string;
  isEditMode: string;
  setEdit: Function;
}

const Review = (Props: Props) => {
  const review = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [selected, setSelected] = useState(Props.star || "5");
  const token = useAppSelector((state) => state.authReducer.token);
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    review.current.value = Props.content;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const perfumeId = Number(router.query.id as string);

    if (review.current?.value) {
      if (Props.isEditMode === "true") {
        // 수정
        await apiPutPerfumeReview(
          token,
          perfumeId,
          review.current?.value,
          selected
        )
          .then((res) => {})
          .catch((err) => {
            alert("수정하려다가 에러..");
          });
        review.current.value = "";
        Props.setEdit(false);
      } else {
        // 새로 만들기
        await apiPostPerfumeReview(
          token,
          perfumeId,
          review.current?.value,
          selected
        )
          .then((res) => {
            console.log(res);
            review.current.value = "";
            router.reload(window.location.pathname);
          })
          .catch((err) => {
            alert("한 계정 당 하나의 리뷰만 남길 수 있습니다.");
            review.current.value = "";
            console.log(err);
          });
      }
    } else {
      alert("한 글자 이상 써주세요.");
    }
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  if (isAuthenticated) {
    return (
      <section className={styles.container}>
        <form className={styles.formContainer} onSubmit={onSubmit}>
          <label className={styles.content} htmlFor="review">
            솔직한 리뷰를 남겨주세요 :)
          </label>
          <textarea
            id="review"
            name="review"
            rows={5}
            cols={50}
            ref={review}
            placeholder="리뷰를 써주세요:)"
          ></textarea>

          <select name="star" id="star" onChange={handleChangeSelect}>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <button className={styles.btn}>작성</button>
        </form>
      </section>
    );
  } else {
    return (
      <div className={styles.content}>
        리뷰를 남기고 싶으면 로그인이 필요합니다.
      </div>
    );
  }
};

export default Review;
