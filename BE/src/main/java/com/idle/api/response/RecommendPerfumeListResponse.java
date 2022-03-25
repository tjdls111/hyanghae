/**
 *
 * RecommendPerfumeListResponse
 * 향수 추천 목록 조회 response 생성
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-21
 * 마지막 수정일 2022-03-22
 **/

package com.idle.api.response;

import com.idle.db.entity.Perfume;
import lombok.Getter;
import lombok.Setter;


import java.util.List;
import java.util.Map;

@Getter
@Setter
public class RecommendPerfumeListResponse extends BaseResponseBody{

    List<Perfume> recommendPerfumeList1;
    List<Perfume> recommendPerfumeList2;
    List<Perfume> recommendPerfumeList3;


    public static RecommendPerfumeListResponse of(Integer statusCode, String message, Map<String,List<Perfume>> map) {
        RecommendPerfumeListResponse res = new RecommendPerfumeListResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRecommendPerfumeList1(map.get("recommendPerfumeList1"));
        res.setRecommendPerfumeList2(map.get("recommendPerfumeList2"));
        res.setRecommendPerfumeList3(map.get("recommendPerfumeList3"));

        return res;
    }
}