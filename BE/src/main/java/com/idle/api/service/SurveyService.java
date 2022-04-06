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

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface SurveyService {
    Map<String,List<?>> getSurveyList(User user);

    Survey1 getSurvey1ByUserAndSurveyId(User user,Long surveyId);
    List<Perfume> insertSurvey1(User user, Survey1InsertRequest survey1InsertRequest) throws IOException;
    List<Perfume> recommendPerfumeBySurvey1(Survey1 survey1) throws IOException;

    Survey2 getSurvey2ByUserAndSurveyId(User user, Long surveyId);
    Map<String, List<Perfume>> insertSurvey2(User user, Survey2InsertRequest survey1InsertRequest) throws IOException;
    Map<String, List<Perfume>> recommendPerfumeBySurvey2(Survey2 survey2) throws IOException;

}
