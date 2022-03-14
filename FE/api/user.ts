/*
유저 관련 api(회원가입, 로그인 등)
@author Wendy
@version 1.0.0
생성일 2022-03-10
마지막 수정일 2022-03-11
*/
import axios from "axios";
import { BASE_URL } from "./utils";
import { useRouter } from "next/router";

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
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

export const apiCheckNickname = async (userNickname: string) =>
  await axios({
    method: "get",
    url: `${BASE_URL}/user/duplicatenickname/${userNickname}`,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

export const apiCheckId = async (userId: string) =>
  await axios({
    method: "get",
    url: `${BASE_URL}/user/duplicateid/${userId}`,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

export const apiLogin = async (userId: string, userPw: string) =>
  await axios({
    method: "post",
    url: `${BASE_URL}/user/login`,
    data: {
      userId,
      userPw,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

export const apiSendEmailNum = async (email: string) =>
  await axios({
    method: "get",
    url: `${BASE_URL}/user/sendemailnum/${email}`,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

export const socialLogin = () => {
  const router = useRouter();
  const token = router.query.token as string;
  localStorage.setItem("token", token);
};
