import React, { useEffect, useState } from "react";
import SelectSurvey from "../../components/survey/selectSurvey";
import Navigation from "../../components/navigation/navigation";
import InsertTitle from "../../components/survey/insertTitle";
import { useRouter } from "next/router";
import { useAppSelector } from "../../reducers/hooks";

const survey = () => {
  const [state, setState] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router.isReady]);

  return (
    <>
      <Navigation />
      {!state ? <InsertTitle setState={setState} /> : <SelectSurvey />}
    </>
  );
};

export default survey;
