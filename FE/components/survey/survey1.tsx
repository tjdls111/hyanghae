import React, { useState } from "react";
import Survey1Of1 from "./survey1/survey1Of1";
import Survey1Of2 from "./survey1/survey1Of2";
import Survey1Of3 from "./survey1/survey1Of3";
import Survey1Of4 from "./survey1/survey1Of4";
import Survey1Of5 from "./survey1/survey1Of5";
import Survey1Res from "./survey1/survey1Res";
const Servey1 = () => {
  const [time, setOneState] = useState(-1);
  const [gender, setTwoState] = useState(-1);
  const [season, setThreeState] = useState(-1);
  const [tpo, setFourState] = useState(-1);
  const [mood, setFiveState] = useState(-1);

  const resultProp = { time, gender, season, tpo, mood };
  return (
    <>
      {time === -1 ? (
        <Survey1Of1 setState={setOneState} />
      ) : gender === -1 ? (
        <Survey1Of2 setState={setTwoState} />
      ) : season === -1 ? (
        <Survey1Of3 setState={setThreeState} />
      ) : tpo === -1 ? (
        <Survey1Of4 setState={setFourState} />
      ) : mood === -1 ? (
        <Survey1Of5 setState={setFiveState} />
      ) : (
        <Survey1Res prop={resultProp} />
      )}
    </>
  );
};

export default Servey1;
