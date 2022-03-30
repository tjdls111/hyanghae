/**
 *
 * SurveyServiceImpl
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
import com.idle.db.entity.*;
import com.idle.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("surveyService")
public class SurveyServiceImpl implements SurveyService{

    @Autowired
    Survey1Repository survey1Repository;
    @Autowired
    Survey2Repository survey2Repository;
    @Autowired
    Survey3Repository survey3Repository;
    @Autowired
    PerfumeRepository perfumeRepository;
    @Autowired
    UserRepository userRepository;


    @Override
    public Map<String, List<?>> getSurveyList(User user) {
        User targetUser = userRepository.findByUserId(user.getUserId()).get();
        //유저의 설문조사 1,2,3 리스트
        List<Survey1> survey1List = new ArrayList<Survey1>(targetUser.getSurvey1List());
        List<Survey2> survey2List = new ArrayList<Survey2>(targetUser.getSurvey2List());
        List<Survey3> survey3List = new ArrayList<Survey3>(targetUser.getSurvey3List());

        //추천결과 리스트 리턴
        Map<String,List<?>> map = new HashMap<>();
        map.put("survey1List", Collections.singletonList(survey1List));
        map.put("survey2List", Collections.singletonList(survey2List));
        map.put("survey3List", Collections.singletonList(survey3List));

        return map;

    }

    /* David : 설문조사1 조회 */
    @Override
    public Survey1 getSurvey1ByUserAndSurveyId(User user, Long surveyId) {
        Optional<Survey1> survey1 = survey1Repository.getSurvey1ByUserAndSurveyId(user, surveyId);
        return survey1.get();
    }

    /* David : 설문조사1 저장 */
    @Override
    public List<Perfume> insertSurvey1(User user, Survey1InsertRequest req) {

        Survey1 survey1 = Survey1.builder()
                .user(user)
                .surveyTitle(req.getSurveyTitle())
                .gender(req.getGender())
                .time(req.getTime())
                .season(req.getSeason())
                .tpo(req.getTpo())
                .mood(req.getMood())
                .build();

        survey1Repository.save(survey1);

        List<Perfume> recommendList = recommendPerfumeBySurvey1(survey1);

        return recommendList;
    }

    /* David : 설문조사1 기반 향수 추천 */
    @Override
    public List<Perfume> recommendPerfumeBySurvey1(Survey1 survey1) {

        return null;
    }

    /* David : 설문조사2 조회 */
    @Override
    public Survey2 getSurvey2ByUserAndSurveyId(User user, Long surveyId) {
        Optional<Survey2> survey2 = survey2Repository.getSurvey2ByUserAndSurveyId(user, surveyId);
        return survey2.get();
    }

    /* David : 설문조사2 저장 */
    @Override
    public List<Perfume> insertSurvey2(User user, Survey2InsertRequest survey2InsertRequest) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(survey2InsertRequest.getPerfumeId());

        Survey2 survey2 = Survey2.builder()
                .user(user)
                .surveyTitle(survey2InsertRequest.getSurveyTitle())
                .perfume(checkPerfume.get())
                .build();

        survey2Repository.save(survey2);

        List<Perfume> recommendList = recommendPerfumeBySurvey2(survey2);

        return recommendList;
    }

    /* David : 설문조사2 기반 향수 추천 */
    @Override
    public List<Perfume> recommendPerfumeBySurvey2(Survey2 survey2) {
        return null;
    }


}
