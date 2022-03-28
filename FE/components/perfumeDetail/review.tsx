/*
리뷰
리뷰 폼
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-23
*/

import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { apiPostPerfumeReview } from "../../api/perfume";
import styles from "./review.module.css";
import Link from "next/link";

const Review = () => {
  const review = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [selected, setSelected] = useState("5");

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const perfumeId = Number(router.query.id as string);
    console.log(selected);
    if (review.current?.value) {
      try {
        await apiPostPerfumeReview(
          token,
          perfumeId,
          review.current?.value,
          selected
        ).then((res) => {
          console.log(res);
          review.current.value = "";
        });
      } catch (e) {
        alert("You can leave only one review.");
        review.current.value = "";
        console.error(e);
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
