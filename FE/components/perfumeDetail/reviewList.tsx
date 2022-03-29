/*
리뷰 리스트
리뷰 리스트
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-29
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiDeletePerfumeReview, apiGetPerfumeReview } from "../../api/perfume";
import styles from "./reviewList.module.css";
import Review from "./review";

interface ReviewInterface {
  reviewContent: string;
  reviewScore: number;
  userNickname: string;
}
const ReviewList = () => {
  const [data, setData] = useState([] as Array<ReviewInterface>);
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const userName = "aaaaaaaa"; //실제 유저 닉네임 받아오는 걸로 바꿔주기

  const onDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    apiDeletePerfumeReview(router.query.id as string, token)
      .then((res) => {
        alert("삭제되었습니다.");

        apiGetPerfumeReview(router.query.id as string)
          .then((res) => {
            console.log(res);
            setData(res.data.reviewList);
          })
          .catch((err) => {
            console.log(err);
          });
      
        })
      .catch((err) => {
        console.log(err);
      });
  };

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
  }, [router, editMode]);

  const changeEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };
  return (
    <article className={styles.container}>
      <h1>Review</h1>
      <ul>
        {data &&
          data.map((d) => (
            <li key={d.userNickname}>
              {!editMode && (
                <div>
                  {d.userNickname} : ${d.reviewScore}: {`${d.reviewContent}`}
                  {d.userNickname === userName && (
                    <div>
                      <form onSubmit={onDelete}>
                        <button>Delete</button>
                      </form>
                      <button onClick={changeEditMode}>Edit</button>
                    </div>
                  )}
                </div>
              )}
              {editMode && (
                <Review
                  isEditMode="true"
                  setEdit={setEditMode}
                  star={`${d.reviewScore}`}
                  content={d.reviewContent}
                />
              )}
            </li>
          ))}
      </ul>
    </article>
  );
};

export default ReviewList;
