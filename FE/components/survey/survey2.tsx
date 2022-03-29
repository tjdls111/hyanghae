import React, { useState } from "react";
import Survey2Of1 from "./survey2/survey2Of1";
import Survey2Res from "./survey2/survey2Res";
const Survey2 = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <div>{state ? <Survey2Of1 /> : <Survey2Res />}</div>
    </>
  );
};

export default Survey2;
