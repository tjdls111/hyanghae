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
import { useAppSelector } from "../../reducers/hooks";
import Pagination from "./pagination";
interface ReviewInterface {
  reviewContent: string;
  reviewScore: number;
  userNickname: string;
}
const ReviewList = () => {
  const router = useRouter();
  const [data, setData] = useState([] as Array<ReviewInterface>);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(null);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const token = useAppSelector((state) => state.authReducer.token);

  // 유저 닉네임 받아오기
  useEffect(() => {
    if (token) {
      apiUserLookUp(token)
        .then((res) => {
          setUserName(res.data.userNickName);
        })
        .catch((err) => {});
    }
  }, [token]);

  //댓글 편집 여부
  const changeEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  // 댓글 삭제
  const onDelete = (e) => {
    if (token) {
      e.preventDefault();
      apiDeletePerfumeReview(router.query.id as string, token)
        .then((res) => {
          alert("삭제되었습니다.");
          setPage(0);
          getReview();
        })
        .catch((err) => {
          console.log(err);
        });
      getReview();
    }
  };

  // 댓글 가져오기
  const getReview = () => {
    apiGetPerfumeReview(router.query.id as string, page, limit, "")
      .then((res) => {
        setTotal(res.data.totalElements);
        setData(res.data.reviewList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getReview();
    }
  }, [router, editMode, limit, page]);

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>Reviews</h1>
      {data.length == 0 && (
        <h2 className={styles.content}>There are no review.. </h2>
      )}
      {data.length > 0 && (
        <label htmlFor="limit">
          <span className={styles.content}>Review count per page </span>
          <select
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      )}

      <ul className={styles.myList}>
        {data &&
          data.map((d) => (
            <li key={d.userNickname}>
              {!editMode && (
                <div className={styles.oneReview}>
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
                  <p className={styles.content}>
                    {d.userNickname} : {`${d.reviewContent}`}
                  </p>
                  <div>
                    <div
                      className={styles.starBox}
                      style={{ width: d.reviewScore * 16 }}
                    >
                      <img
                        className={styles.pointOfStar}
                        alt="별"
                        src="/images/pinkStar.png"
                      />
                    </div>
                    <img
                      className={styles.backStar}
                      alt="별"
                      src="/images/greyStar.png"
                    />
                  </div>
                  {/* <div
                    className={clsx(styles.imageContainer, styles.starBox)}
                    style={{ width: d.reviewScore * 20 }}
                  >
                    <Image
                      className={styles.pointOfStar}
                      alt="별"
                      src="/images/star.png"
                      layout="fill"
                    />
                  </div>
                  <div className={styles.imageContainer}>
                    <Image
                      className={styles.backBox}
                      alt="별"
                      src="/images/greyStar.png"
                      layout="fill"
                    />
                  </div> */}
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
      {data.length !== 0 && (
        <footer>
          <Pagination
            total={total}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      )}
    </article>
  );
};

export default ReviewList;
