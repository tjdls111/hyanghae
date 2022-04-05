import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL, dataType } from "./user";

interface surveyType {
  gender: number;
  mood: number;
  season: number;
  time: number;
  tpo: number;
  surveyTitle?: string;
}
interface perfumeNameType {
  brandName: string;
  korName: string;
}
interface perfumeData {
  group: string;
  note1: string;
  note2: string;
  note3: string;
  perfumeBrand: perfumeNameType;
  perfumeId: number;
  perfumeName: string;
  perfumeScore: number;
  reviewCnt: number;
  imgUrl: string;
}

export interface survey2Search {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  first: boolean;
  last: boolean;
  perfumeList: perfumeListType[];
}

export interface perfumeListType {
  perfumeId: number;
  imgUrl: string;
  perfumeName: string;
}
export interface res2Type {
  data?: dataType & survey2Search;
}

export interface brandType {
  brandName: string;
  korName: string;
}

export type surveyPerfume = surveyType & perfumeData & resType;
export interface listRes {
  recommendPerfumeList?: surveyPerfume[];
  brandList?: brandType[];
}
export interface resType {
  data?: dataType & listRes;
}

export const apiSurvey1Res = async (
  survey1: surveyType,
  accessToken: string
): Promise<surveyPerfume> => {
  try {
    return await axios.post(
      `${BASE_URL}/survey/1`,
      {
        gender: survey1.gender,
        mood: survey1.mood,
        season: survey1.season,
        surveyTitle: survey1.surveyTitle,
        time: survey1.time,
        tpo: survey1.tpo,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server Error");
  }
};

export const apiSurvey2Brand = async (
  accessToken: string
): Promise<resType> => {
  try {
    return await axios.get(`${BASE_URL}/perfume/brand`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    throw new Error("server Error");
  }
};
// perfume/brand/Jo%20malone%20London?content=B&page=0&size=9
export const apiSurvey2Perfume = async (
  brand: string,
  content: string,
  page: number,
  size: number
): Promise<res2Type> => {
  try {
    return await axios.get(
      `${BASE_URL}/perfume/brand/${brand}?content=${content}&page=${page}&size=${size}`
    );
  } catch (e) {
    throw new Error("server Error");
  }
};
interface perfumeDtType {
  perfumeId: number;
  surveyTitle: string;
}

export const apiSurvey2SameRes = async (
  data: perfumeDtType,
  accessToken: string
): Promise<resType> => {
  try {
    return await axios.post(`${BASE_URL}/survey/2`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    throw new Error("server Error");
  }
};
