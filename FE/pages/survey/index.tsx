import React, { useState } from "react";
import SelectSurvey from "../../components/survey/selectSurvey";
import Navigation from "../../components/navigation/navigation";
import InsertTitle from "../../components/survey/insertTitle";

const survey = () => {
  const [state, setState] = useState(false);
  return (
    <>
      <Navigation />
      {!state ? <InsertTitle setState={setState} /> : <SelectSurvey />}
    </>
  );
};

export default survey;
