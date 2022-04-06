import React, { useEffect, useState } from "react";
import styles from "./surv2PerfumeDetail.module.css";
import Image from "next/image";
import { useAppSelector } from "../../../../reducers/hooks";
import { RootState } from "../../../../reducers/store";
import { apiSurvey2SameRes, surveyPerfume } from "../../../../api/survey";
import Surv2PerfumeResult from "./surv2PerfumeResult";

interface propType {
  id: number;
  name: string;
  url: string;
  brand: string;
  setBack: (data: boolean) => void;
}

const Surv2PerfumeDetail = ({ id, name, url, brand, setBack }: propType) => {
  const [state, setState] = useState<surveyPerfume[]>([]);
  const [data, setData] = useState(false);
  const token = useAppSelector((state: RootState) => state.authReducer.token);
  const goSamePerfume = async () => {
    const data = { perfumeId: id, surveyTitle: "survey2" };
    try {
      const result = await apiSurvey2SameRes(data, token);
      setState(result.data.similarPerfumeList);
      setData(true);
    } catch (e) {
      console.error(e);
    }
  };

  const goDifferPerfume = async () => {
    const data = { perfumeId: id, surveyTitle: "survey2" };
    try {
      const result = await apiSurvey2SameRes(data, token);
      setState(result.data.differentPerfumeList);
      setData(true);
    } catch (e) {
      console.error(e);
    }
  };

  const resultRecommend = state.map((item) => (
    <Surv2PerfumeResult
      brand={item.perfumeBrand.korName}
      name={item.perfumeName}
      url={item.imgUrl}
      id={item.perfumeId}
    />
  ));

  const goBack = () => {
    setBack(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {<Image alt="perfumeImg" src={url} objectFit="contain" layout="fill"></Image>}
      </div>
      <div className={styles.informWrapper}>
        <div>{`선택하신 향수의 브랜드 : ${brand}`}</div>
        <div>{`향수명 : ${name}`}</div>
      </div>
      {!data ? (
        <div className={styles.buttonContainer}>
          <div>
            <button type="button" onClick={goSamePerfume}>
              이 향수와 비슷한 향기 찾기
            </button>
          </div>
          <div>
            <button type="button" onClick={goDifferPerfume}>
              이 향수와 색다른 향기 찾기
            </button>
          </div>
          <div>
            <button type="button" onClick={goBack}>
              다른 향수 선택하기
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.resultHeader}>선택하신 향수와 비슷한 향수 추천 목록</div>
          <div className={styles.resultList}>{resultRecommend}</div>
        </>
      )}
    </div>
  );
};

export default Surv2PerfumeDetail;
