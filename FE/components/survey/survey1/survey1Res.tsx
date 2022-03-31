import React, { useState } from "react";
import Loading from "../../loading/loading";
import { useEffect } from 'react';

interface dataProp {
  oneState: number;
  twoState: number;
  threeState: number;
  fourState: number;
  fiveState: number;
}

interface resultProp {
  prop: dataProp;
}

const Survey1Res = ({ prop }: resultProp) => {

  const [loading, setLoading] = useState(true);
  const { oneState, twoState, threeState, fourState, fiveState } = prop;
  useEffect(() => {
    let isCompleted = false;

    (async )


  }, [])

  return (
    <div>
      {loading ? <Loading /> : <}
    </div>
  );
};

export default Survey1Res;
