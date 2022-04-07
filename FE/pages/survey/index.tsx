import React, { useEffect, useState } from "react";
import SelectSurvey from "../../components/survey/selectSurvey";
import Navigation from "../../components/navigation/navigation";
import InsertTitle from "../../components/survey/insertTitle";
import { useRouter } from "next/router";
import { useAppSelector } from "../../reducers/hooks";
import Head from "next/head";

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
  }, []);

  return (
    <>
      <Head>
        <title>향수 추천</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <Navigation />
      {!state ? <InsertTitle setState={setState} /> : <SelectSurvey />}
    </>
  );
};

export default survey;
