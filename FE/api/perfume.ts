/*
향수 관련 api
@author Wendy
@version 1.0.0
생성일 2022-03-22
마지막 수정일 2022-03-29
*/

import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export interface searchResult {
  data(data: any);
  message: string;
  statusCode: number;
}

export const apiShoppingSearch = async (
  keyword: string
): Promise<searchResult> => {
  try {
    return await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=perfume ${keyword}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EBAY_API_KEY}`,
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
  reviewScore: string
): Promise<PerfumeResult> => {
  try {
    return await axios.post(
      `${BASE_URL}/perfume/review`,
      { perfumeId, reviewContent, reviewScore },
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

export const apiGetPerfumeReview = async (perfumeId: string) => {
  try {
    return await axios.get(`${BASE_URL}/perfume/review/list/${perfumeId}`);
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiDeletePerfumeReview = async (
  perfumeId: string,
  token: string
) => {
  try {
    return await axios.delete(`${BASE_URL}/perfume/review/${perfumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiPutPerfumeReview = async (
  token: string,
  perfumeId: number,
  reviewContent: string,
  reviewScore: string
) => {
  try {
    return await axios.put(
      `${BASE_URL}/perfume/review`,
      { perfumeId, reviewContent, reviewScore },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server error");
  }
};

export const updateEbayKey = async () => {
  try {
    return await axios.post(
      `https://api.ebay.com/identity/v1/oauth2/token`,
      {
        grant_type: "refresh_token",
        refresh_token:
          "v^1.1#i^1#p^3#f^0#r^0#I^3#t^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",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic seoinkim--PRD-094e46b78-f284ac31:PRD-94e46b784633-5c2d-438c-ae10-1d0e",
        },
      }
    );
  } catch (e) {
    console.log(e);
    // throw new Error("server error");
  }
};
