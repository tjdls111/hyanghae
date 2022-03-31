/**
 *
 * SurveyController
 * 설문조사 컨틀올러
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-29
 * 마지막 수정일 2022-03-29
 **/

package com.idle.api.controller;

import com.idle.api.request.Survey1InsertRequest;
import com.idle.api.request.Survey2InsertRequest;
import com.idle.api.response.BaseResponseBody;
import com.idle.api.response.SurveyListResponse;
import com.idle.api.response.SurveyResultResponse;
import com.idle.api.service.SurveyService;
import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.Survey1;
import com.idle.db.entity.Survey2;
import com.idle.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@Api(value = "설문조사 API", tags = {"Survey"})
@RestController
@RequestMapping("/survey")
public class SurveyController {

    @Autowired
    SurveyService surveyService;

    @ApiOperation("설문조사 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<? extends BaseResponseBody> getSurveyList(@ApiIgnore Authentication authentication) {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();
        Map<String,List<?>> surveyList = surveyService.getSurveyList(user);
        return ResponseEntity.ok(SurveyListResponse.of(200,"success",surveyList));
    }

    @ApiOperation("설문조사1 저장")
    @PostMapping("/1")
    public ResponseEntity<? extends BaseResponseBody> insertSurvey1(@ApiIgnore Authentication authentication, @RequestBody Survey1InsertRequest survey1InsertRequest) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        //설문조사1 저장 and 추천 (Service 안에서 설문조사 저장하고 recommendPerfumeBySurvey1 호출)
        List<Perfume> recommendList = surveyService.insertSurvey1(user,survey1InsertRequest);

        return ResponseEntity.ok(SurveyResultResponse.of(200,"설문조사1 등록 성공",recommendList));
    }

    @ApiOperation("설문조사1 추천")
    @GetMapping("/recommend1/{surveyId}")
    public ResponseEntity<? extends BaseResponseBody> recommendBySurvey1(@ApiIgnore Authentication authentication, @PathVariable("surveyId") Long surveyId) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        Survey1 survey1 = surveyService.getSurvey1ByUserAndSurveyId(user, surveyId);
        List<Perfume> recommendList = surveyService.recommendPerfumeBySurvey1(survey1);


        return ResponseEntity.ok(SurveyResultResponse.of(200,"success",recommendList));
    }

    @ApiOperation("설문조사2 저장")
    @PostMapping("/2")
    public ResponseEntity<? extends BaseResponseBody> insertSurvey2(@ApiIgnore Authentication authentication, @RequestBody Survey2InsertRequest survey2InsertRequest) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        //설문조사1 저장 and 추천 (Service 안에서 설문조사 저장하고 recommendPerfumeBySurvey2 호출)
        List<Perfume> recommendList = surveyService.insertSurvey2(user,survey2InsertRequest);

        return ResponseEntity.ok(SurveyResultResponse.of(200,"설문조사2 등록 성공",recommendList));
    }

    @ApiOperation("설문조사2 추천")
    @GetMapping("/recommend2/{survey2Id}")
    public ResponseEntity<? extends BaseResponseBody> recommendBySurvey2(@ApiIgnore Authentication authentication, @PathVariable("survey2Id") Long surveyId) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        Survey2 survey2 = surveyService.getSurvey2ByUserAndSurveyId(user, surveyId);
        List<Perfume> recommendList = surveyService.recommendPerfumeBySurvey2(survey2);


        return ResponseEntity.ok(SurveyResultResponse.of(200,"success",recommendList));
    }
}
