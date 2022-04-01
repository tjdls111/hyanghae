package com.idle.api.response;

import com.idle.db.entity.Perfume;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
public class SurveyResultResponse extends BaseResponseBody{

    List<Perfume> recommendPerfumeList;

    public static SurveyResultResponse of(Integer statusCode, String message, List<Perfume> recommendPerfumeList) {
        SurveyResultResponse res = new SurveyResultResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRecommendPerfumeList(recommendPerfumeList);

        return res;
    }
}
