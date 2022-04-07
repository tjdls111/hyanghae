import React, { useState } from "react";
import Survey3Of1 from "./survey3/survey3Of1";
import Survey3Res from "./survey3/survey3Res";
import styles from "./survey3.module.css";
import { surveyPerfume } from "../../api/survey";

const Survey3 = () => {
  const [state, setState] = useState(false);
  const [data, setData] = useState<surveyPerfume[]>([]);
  return (
    <>
      <div className={styles.container}>
        {state ? <Survey3Res data={data}/> : <Survey3Of1 setResult={setState} setData={setData} />}
      </div>
    </>
  );
};

export default Survey3;
