import React, { useState } from "react";
import Survey1Of1 from "./survey1/survey1Of1";
import Survey1Of2 from "./survey1/survey1Of2";
import Survey1Of3 from "./survey1/survey1Of3";
import Survey1Of4 from "./survey1/survey1Of4";
import Survey1Of5 from "./survey1/survey1Of5";
import Survey1Res from "./survey1/survey1Res";
import styles from "./survey.module.css";
const Servey1 = () => {
  const [oneState, setOneState] = useState(-1);
  const [twoState, setTwoState] = useState(-1);
  const [threeState, setThreeState] = useState(-1);
  const [fourState, setFourState] = useState(-1);
  const [fiveState, setFiveState] = useState(-1);

  const resultProp = { oneState, twoState, threeState, fourState, fiveState };
  return (
    <div className={styles.container}>
      {oneState === -1 ? (
        <Survey1Of1 setState={setOneState} />
      ) : twoState === -1 ? (
        <Survey1Of2 setState={setTwoState} />
      ) : threeState === -1 ? (
        <Survey1Of3 setState={setThreeState} />
      ) : fourState === -1 ? (
        <Survey1Of4 setState={setFourState} />
      ) : fiveState === -1 ? (
        <Survey1Of5 setState={setFiveState} />
      ) : (
        <Survey1Res prop={resultProp} />
      )}
    </div>
  );
};

export default Servey1;
