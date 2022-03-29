import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Survey1 from "../../components/survey/survey1";
import Survey2 from "../../components/survey/survey2";
import Survey3 from "../../components/survey/survey3";
import Navigation from "../../components/navigation/navigation";
const Detail = () => {
  const [state, setState] = useState("");
  const router = useRouter();

  useEffect(() => {
    let completed = false;

    if (!completed && router.isReady) {
      setState(router.query.id as string);
    }
    return () => {
      completed = true;
    };
  }, [router.isReady]);

  return (
    <>
      <Navigation />
      {state === "1" ? <Survey1 /> : state === "2" ? <Survey2 /> : <Survey3 />}
    </>
  );
};

export default Detail;
