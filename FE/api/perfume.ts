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
      `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=perfume`,
      {
        headers: {
          "Authorization":
            "Bearer v^1.1#i^1#f^0#p^3#I^3#r^0#t^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",
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
