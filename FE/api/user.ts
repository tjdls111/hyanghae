/*
유저 관련 api
@author Wendy
@version 1.0.0
생성일 2022-03-10
마지막 수정일 2022-03-10
*/
import axios from "axios";

export const apiSignup = (
  userEmail: string,
  userId: string,
  userNickname: string,
  password: string
) =>
  axios({
    method: "post",
    url: "http://localhost:8181/user/signup",
    data: {
      userEmail,
      userId,
      userNickname,
      userPw: password,
    },
  });
