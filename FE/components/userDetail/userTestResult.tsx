import React, { useState } from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../reducers/hooks";
import { RootState } from "../../reducers/store";
import { recommend1Result, recommend2Result } from "../../api/perfume";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../components/survey/survey1/surveyRes.module.css";

const UserTestResult = () => {
  const [data, setData] = useState([]);
  const token = useAppSelector((state: RootState) => state.authReducer.token);
  const router = useRouter();
  const { type, id } = router.query;

  const showDetail = (id: number) => {
    router.replace(`/perfume/${id}`);
  };
  const getRes1Data = (id: string) => {
    if (token) {
      recommend1Result(token, id).then((res) => {
        setData(res.data.recommendPerfumeList.splice(0, 6));
      });
    }
  };

  const getRes2Data = (id: string) => {
    if (token) {
      recommend2Result(token, id).then((res) => {
        setData(res.data.recommendPerfumeList.splice(0, 6));
      });
    }
  };

  useEffect(() => {
    if (type == "1") {
      getRes1Data(id as string);
    } else if (type == "2") {
      getRes2Data(id as string);
    }
  }, [id]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>향수 추천 결과</header>
      <div className={styles.listWrapper}>
        <ul className={styles.ulWrapper}>
          {data &&
            data.map((item) => (
              <li className={styles.reslist}>
                { <div className={styles.imgContainer}>
                  <Image
                  src={item.imgUrl}
                  layout="fill"
                  objectFit="contain"
                  ></Image>
                </div> }
                <p>{item.perfumeBrand.brandName}</p>
                <p>{item.perfumeName}</p>
                <div className={styles.buttonContainer}>
                  <button
                    type="button"
                    onClick={() => showDetail(item.perfumeId)}
                  >
                    향수 상세정보
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserTestResult;
