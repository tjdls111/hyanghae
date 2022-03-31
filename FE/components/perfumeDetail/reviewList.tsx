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
import { apiUserLookUp } from "../../api/user";
import styles from "./reviewList.module.css";
import Review from "./review";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../reducers/hooks";
interface ReviewInterface {
  reviewContent: string;
  reviewScore: number;
  userNickname: string;
}
const ReviewList = () => {
  const [data, setData] = useState([] as Array<ReviewInterface>);
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(null);

  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.authReducer.token);

  //실제 유저 닉네임 받아오기
  useEffect(() => {
    apiUserLookUp(token)
      .then((res) => {
        console.log(res);
        setUserName(res.data.userNickName);
      })
      .catch((err) => {});
  }, []);

  

  const onDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    apiDeletePerfumeReview(router.query.id as string, token)
      .then((res) => {
        apiGetPerfumeReview(router.query.id as string)
          .then((res) => {
            alert("삭제되었습니다.");
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
      <h1 className={styles.title}>Reviews</h1>
      {data.length == 0 && (
        <h2 className={styles.content}>There are no review.. </h2>
      )}
      <ul className={styles.myList}>
        {data &&
          data.map((d) => (
            <li key={d.userNickname}>
              {!editMode && (
                <div className={styles.oneReview}>
                  <p className={styles.content}>
                    {d.userNickname} : {`${d.reviewContent}`} (
                    {`${d.reviewScore}`})
                  </p>
                  {d.userNickname === userName && (
                    <div className={styles.oneReview}>
                      <button
                        className={styles.editBtn}
                        onClick={changeEditMode}
                      >
                        Edit
                      </button>
                      <form onSubmit={onDelete}>
                        <button className={styles.delBtn}>Delete</button>
                      </form>
                    </div>
                  )}
                </div>
              )}
              {editMode && (
                <div>
                  {d.userNickname === userName && (
                    <Review
                      isEditMode="true"
                      setEdit={setEditMode}
                      star={`${d.reviewScore}`}
                      content={d.reviewContent}
                    />
                  )}
                  {d.userNickname !== userName && (
                    <div>
                      {d.userNickname} : ${d.reviewScore}:{" "}
                      {`${d.reviewContent}`}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </article>
  );
};

export default ReviewList;
