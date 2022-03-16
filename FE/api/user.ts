/*
유저 관련 api(회원가입, 로그인 등)
@author Wendy
@version 1.0.0
생성일 2022-03-10
마지막 수정일 2022-03-11
*/
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { BASE_URL } from "./utils";
import { useRouter } from "next/router";

export interface tokenType extends signUpType {
  token: string;
}

export interface signUpType {
  message: string;
  statusCode: number;
}

export const apiSignup = async (
  userEmail: string,
  userId: string,
  userNickname: string,
  password: string
): Promise<signUpType> => {
  try {
    return await axios.post(`${BASE_URL}/user/signup`, {
      userId,
      userEmail,
      userNickname,
      userPw: password,
    });
  } catch (e) {
    throw new Error("server Error");
  }
};

export const apiCheckNickname = async (userNickname: string) =>
  await axios.get(`${BASE_URL}/user/duplicatenickname/${userNickname}`);

export const apiCheckId = async (userId: string) =>
  await axios.get(`${BASE_URL}/user/duplicateid/${userId}`);

export const apiSendEmailNum = async (email: string) =>
  await axios.get(`${BASE_URL}/user/sendemailnum/${email}`);

export const socialLogin = () => {
  const router = useRouter();
  const token = router.query.token as string;
  localStorage.setItem("token", token);
};

export const apiLogin = async (userId: string, userPw: string): Promise<tokenType> => {
  try {
    return await axios.post(`${BASE_URL}/user/login`, {
      userId,
      userPw,
    });
  } catch (e) {
    throw new Error("Unable to get a token to server");
  }
};
