package com.idle.api.response;

import com.idle.db.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SurveyListResponse extends BaseResponseBody{

    List<Survey1> survey1List;
    List<Survey2> survey2List;
    List<Survey3> survey3List;

    public static SurveyListResponse of(Integer statusCode, String message, Map<String,List<?>> surveyList) {
        SurveyListResponse res = new SurveyListResponse();
        List<Map<String, Object>> reviewList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.setSurvey1List((List<Survey1>) surveyList.get("survey1List"));
        res.setSurvey2List((List<Survey2>) surveyList.get("survey2List"));
        res.setSurvey3List((List<Survey3>) surveyList.get("survey3List"));

        return res;

    }
}
