/*
향수 관련 api
@author Wendy
@version 1.0.0
생성일 2022-03-22
마지막 수정일 2022-03-23
*/

import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { BASE_URL } from "./utils";

export interface searchResult {
  message: string;
  statusCode: number;
}

export const apiShoppingSearch = async (
  keyword: string
): Promise<searchResult> => {
  try {
    return await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?${keyword}&limit=3`,
      {
        headers: {
          // "X-Naver-Client-Id": "",
          // "X-Naver-Client-Secret": "",
        },
      }
    );
  } catch (e) {
    throw new Error("server Error");
  }
};

export interface PerfumeResult {
  message: string;
  statusCode: number;
  data: object;
}

export const apiPerfumeDetail = async (
  perfumeId: string
): Promise<PerfumeResult> => {
  try {
    return await axios.get(`${BASE_URL}/perfume/${perfumeId}/`);
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiPostPerfumeReview = async (
  accessToken: string,
  perfumeId: number,
  reviewContent: string,
  reviewScore: string,
  reviewTitle: string
): Promise<PerfumeResult> => {
  try {
    return await axios.post(
      `${BASE_URL}/review`,
      { perfumeId, reviewContent, reviewScore, reviewTitle },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server error");
  }
};
