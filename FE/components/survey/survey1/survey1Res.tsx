import React, { useState } from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../../reducers/hooks";
import { apiSurvey1Res, surveyPerfume } from "../../../api/survey";
import { RootState } from "../../../reducers/store";

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

  const token = useAppSelector((state: RootState) => state.authReducer.token);
  const req = { ...prop, surveyTitle: "survey1" };
  const pList = state.map((item, idx) => <li key={idx}>{item.perfumeName}</li>);
  useEffect(() => {
    let isCompleted = false;

    if (token && !isCompleted) {
      console.log(req);
      (async function post() {
        try {
          const result = await apiSurvey1Res(req, token);
          console.log(result.data.recommendPerfumeList);
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
  return <div style={{ marginTop: "10rem" }}>{<ul>{pList}</ul>}</div>;
};

export default Survey1Res;
