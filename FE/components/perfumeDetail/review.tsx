/*
리뷰
리뷰 폼
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-29
*/

import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { apiPostPerfumeReview, apiPutPerfumeReview } from "../../api/perfume";
import styles from "./review.module.css";
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

  useEffect(() => {
    review.current.value = Props.content;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
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
            review.current.value = "";
            router.reload(window.location.pathname);
          })
          .catch((err) => {
            alert("Sorry.. You can write only one review.");
            review.current.value = "";
            console.log(err);
          });
      }
    } else {
      alert("You have to write at least one text.");
    }
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <section className={styles.container}>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <label htmlFor="review">
          Please leave an honest and kind review ^^
        </label>
        <textarea
          id="review"
          name="review"
          rows={5}
          cols={50}
          ref={review}
          placeholder="Please write a review :)"
        ></textarea>

        <select name="star" id="star" onChange={handleChangeSelect}>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <button className={styles.btn}>Write a Review</button>
      </form>
    </section>
  );
};

export default Review;
