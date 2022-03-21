/*
유저 관련 api(회원가입, 로그인 등)
@author Wendy,scarlet
@version 1.0.0
생성일 2022-03-10
마지막 수정일 2022-03-21
*/
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { BASE_URL } from "./utils";
import { useRouter } from "next/router";

// @author scarlet
export interface dataType {
  message: string;
  statusCode: number;
  token?: string;
}
// @author scarlet
export interface userLookUpType {
  userEmail: string;
  userId: string;
  userNickName: string;
}
// @author scarlet
export interface resType {
  data?: dataType;
}

export interface resLookUpType {
  data?: userLookUpType;
}

export const apiSignup = async (
  userEmail: string,
  userId: string,
  userNickname: string,
  password: string
): Promise<resType> => {
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

export const apiFindUserId = async (email: string) =>
  await axios.get(`${BASE_URL}/user/finduserid/${email}`);

export const apiFindpw = async (
  userEmail: string,
  userId: string
): Promise<resType> => {
  try {
    return await axios.put(`${BASE_URL}/user/finduserpw`, {
      userEmail,
      userId,
    });
  } catch (e) {
    throw new Error("서버 에러");
  }
};

export const apiLogin = async (
  userId: string,
  userPw: string
): Promise<resType> => {
  try {
    return await axios.post(`${BASE_URL}/user/login`, {
      userId,
      userPw,
    });
  } catch (e) {
    throw new Error("Unable to get a token to server");
  }
};

// @author scarlet
export const apiCheckMod = async (
  userPw: string,
  accessToken: string
): Promise<resType> => {
  try {
    return await axios.post(
      `${BASE_URL}/user/checkpw`,
      {
        userPw,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e) {
    throw new Error("Unable to get a response to server");
  }
};

// @author scarlet
export const apiUserLookUp = async (
  accessToken: string
): Promise<resLookUpType> => {
  try {
    return await axios.get(`${BASE_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    throw new Error("Unable to get a response to server");
  }
};

// @author scarlet
export const apiDist = async (accessToken: string): Promise<resType> => {
  try {
    return axios.delete(`${BASE_URL}/user/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    throw new Error("Unable to get a response to server");
  }
};
