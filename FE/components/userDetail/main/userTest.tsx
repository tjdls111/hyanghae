/*
마이페이지 테스트 내역

@author scarlet, wendy
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-04-06
*/

import React, { useEffect, useState } from "react";
import styles from "./userTest.module.css";
import { recommend1Result, surveyList } from "../../../api/perfume";
import { useAppSelector } from "../../../reducers/hooks";
import Link from "next/link";

interface surveyData {
  createDate: string;
  surveyId: string;
  gender: string;
  time: string;
  season: string;
  tpo: string;
  mood: string;
  surveyTitle: string;
}
const UserTest = () => {
  const [survey1List, setSur1] = useState([] as Array<surveyData>);
  const [survey2List, setSur2] = useState([] as Array<surveyData>);
  const [survey3List, setSur3] = useState([] as Array<surveyData>);
  const token = useAppSelector((state) => state.authReducer.token);

  useEffect(() => {
    if (token) {
      surveyList(token as string)
        .then((res) => {
          const tmp = res.data;
          setSur1(tmp.survey1List[0]);
          setSur2(tmp.survey2List[0]);
          setSur3(tmp.survey3List[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  return (
    <section className={styles.container}>
      <div className={styles.title}>라이프 스타일에 따른 테스트 결과 모음</div>
      {survey1List.length == 0 && (
        <div className={styles.subtitle}>
          테스트를 한번도 한 적이 없으시네요~ 테스트해보세용
        </div>
      )}
      {survey1List.map((survey) => (
        <Link
          href={{
            pathname: "/survey/result",
            query: { type: 1, id: survey.surveyId },
          }}
        >
          <button className={styles.btn} key={survey.surveyId}>
            {survey.surveyTitle} | {survey.createDate.slice(0, 10)}
          </button>
        </Link>
      ))}

      <div className={styles.title}>향수에 따른 테스트 결과 모음</div>
      {survey2List.length == 0 && (
        <div className={styles.subtitle}>
          테스트를 한번도 한 적이 없으시네요~ 테스트해보세용
        </div>
      )}
      {survey2List.map((survey) => (
        <Link
          href={{
            pathname: "/survey/result",
            query: { type: 2, id: survey.surveyId },
          }}
        >
          <button className={styles.btn} key={survey.surveyId}>
            {survey.surveyTitle} | {survey.createDate.slice(0, 10)}
          </button>
        </Link>
      ))}
      <div className={styles.title}>옷 스타일에 따른 테스트 결과 모음</div>
      {survey3List.length == 0 && (
        <div className={styles.subtitle}>
          테스트를 한번도 한 적이 없으시네요~ 테스트해보세용
        </div>
      )}
      {survey2List.map((survey) => (
        <button className={styles.btn} key={survey.surveyId}>
          {survey.surveyTitle} | {survey.createDate.slice(0, 10)}
        </button>
      ))}
    </section>
  );
};

export default UserTest;
