import React from "react";
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

  useEffect(() => {

  }, [])

  return (
    <div>
      {prop.oneState}
      {prop.twoState}
      {prop.threeState}
      {prop.fourState}
      {prop.fiveState}
    </div>
  );
};

export default Survey1Res;
