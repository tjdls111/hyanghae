/*
마이페이지 main 분기 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-19
*/

import React, { ReactNode } from "react";
import UserTest from "./main/userTest";
import UserModify from "./main/umodify/modify";
import UserPurchase from "./main/userPurchase";
import UserDestroy from "./main/userDestroy";
interface stateProps {
  state: string;
}

const DetailMain: React.FC<stateProps> = ({ state }) => {
  return (
    <div>
      {state === "usertest" ? (
        <UserTest />
      ) : state === "usermodify" ? (
        <UserModify />
      ) : state === "userpurchase" ? (
        <UserPurchase />
      ) : state === "userdestroy" ? (
        <UserDestroy />
      ) : null}
    </div>
  );
};

export default DetailMain;
