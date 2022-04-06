/*
마이페이지 테스트 내역

@author scarlet, wendy
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-04-06
*/

import React, { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { surveyList } from "../../../api/perfume";
import { useAppSelector } from "../../../reducers/hooks";

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
    surveyList(token as string)
      .then((res) => {
        console.log(res.data);
        const tmp = res.data;
        setSur1(tmp.survey1List);
        setSur2(tmp.survey2List);
        setSur3(tmp.survey3List);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(survey1List);
  return (
    <>
      <h1>라이프 스타일에 따른 테스트 결과 모음</h1>
      {survey1List && survey1List.map((s) => <div>{s.surveyTitle}</div>)}
      {/* <h1>향수에 따른 테스트 결과 모음</h1>
      {data?.survey1List?.map((survey) => (
        <p key={survey.createDate}>{survey}</p>
      ))}
      <h1>옷 스타일에 따른 테스트 결과 모음</h1>
      {data?.survey1List?.map((survey) => (
        <p key={survey.createDate}>{survey}</p>
      ))} */}
    </>
  );
};

export default UserTest;
