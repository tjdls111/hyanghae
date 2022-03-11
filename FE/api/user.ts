/*
유저 관련 api
@author Wendy
@version 1.0.0
생성일 2022-03-10
마지막 수정일 2022-03-11
*/
import axios from "axios";
import { BASE_URL } from "./utils";

export const apiSignup = async (
  userEmail: string,
  userId: string,
  userNickname: string,
  password: string
) =>
  await axios({
    method: "post",
    url: `${BASE_URL}/user/signup`,
    data: {
      userEmail,
      userId,
      userNickname,
      userPw: password,
    },
  });

export const apiCheckNickname = async (userNickname: string) =>
  await axios({
    method: "get",
    url: `${BASE_URL}/user/duplicateunickname/${userNickname}`,
  });

export const apiCheckId = async (userId: string) =>
  await axios({
    method: "get",
    url: `${BASE_URL}/user/duplicateuid/${userId}`,
  });

export const apiLogin = async (userId: string, userPw: string) =>
  await axios({
    method: "post",
    url: `${BASE_URL}/user/login`,
    data: {
      userId,
      userPw,
    },
  });
