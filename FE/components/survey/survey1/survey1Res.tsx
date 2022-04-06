import React, { useState } from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../../reducers/hooks";
import { apiSurvey1Res, surveyPerfume } from "../../../api/survey";
import { RootState } from "../../../reducers/store";
import Image from "next/image";
import styles from "./surveyRes.module.css";
import { useRouter } from "next/router";

interface dataProp {
  gender: number;
  mood: number;
  season: number;
  time: number;
  tpo: number;
}

interface resultProp {
  prop: dataProp;
}

const Survey1Res = ({ prop }: resultProp) => {
  const [state, setState] = useState<surveyPerfume[]>([]);
  const surveyTitle = useAppSelector((state: RootState) => state.titleReducer.title);
  const token = useAppSelector((state: RootState) => state.authReducer.token);
  const req = { ...prop, surveyTitle };
  const router = useRouter();
  const showDetail = (id: number) => {
    router.replace(`/perfume/${id}`);
  };

  const pList = state.map((item, idx) => (
    <div key={idx} className={styles.listItem}>
      <div className={styles.imgContainer}>
        <Image src={item.imgUrl} layout="fill" objectFit="contain"></Image>
      </div>

      <li style={{ marginBottom: "1em" }} key={idx}>
        {item.perfumeBrand.brandName}
      </li>
      <li style={{ marginBottom: "2em" }}>{item.perfumeName}</li>
      <div className={styles.buttonContainer}>
        <button type="button" onClick={() => showDetail(item.perfumeId)}>
          향수 상세정보
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    let isCompleted = false;

    if (token && !isCompleted) {
      console.log(req);
      (async function post() {
        try {
          const result = await apiSurvey1Res(req, token);
          setState(result.data.recommendPerfumeList);
        } catch (e) {
          console.error(e);
        }
      })();
    }
    return () => {
      isCompleted = true;
    };
  }, []);
  return (
    <div className={styles.container}>
      <header className={styles.header}>향수 추천 결과</header>
      <div className={styles.listWrapper}>
        <ul className={styles.ulWrapper}>{pList}</ul>
      </div>
    </div>
  );
};

export default Survey1Res;
