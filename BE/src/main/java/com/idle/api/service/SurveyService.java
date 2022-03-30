/**
 *
 * SurveyService
 *
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-29
 * 마지막 수정일 2022-03-29
 **/
package com.idle.api.service;

import com.idle.api.request.Survey1InsertRequest;
import com.idle.api.request.Survey2InsertRequest;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.Survey1;
import com.idle.db.entity.Survey2;
import com.idle.db.entity.User;

import java.util.List;

public interface SurveyService {
    Survey1 getSurvey1ByUserAndSurveyId(User user,Long surveyId);
    List<Perfume> insertSurvey1(User user, Survey1InsertRequest survey1InsertRequest);
    List<Perfume> recommendPerfumeBySurvey1(Survey1 survey1);

    Survey2 getSurvey2ByUserAndSurveyId(User user, Long surveyId);
    List<Perfume> insertSurvey2(User user, Survey2InsertRequest survey1InsertRequest);
    List<Perfume> recommendPerfumeBySurvey2(Survey2 survey2
    );

}
