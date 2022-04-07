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
import com.idle.api.request.Survey3InsertRequest;
import com.idle.api.response.BaseResponseBody;
import com.idle.api.response.Survey1ResultResponse;
import com.idle.api.response.SurveyListResponse;
import com.idle.api.response.Survey2ResultResponse;
import com.idle.api.service.SurveyService;
import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.*;
import com.idle.db.repository.StyleRepository;
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

    @Autowired
    StyleRepository styleRepository;

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

        return ResponseEntity.ok(Survey1ResultResponse.of(200,"설문조사1 등록 성공",recommendList));
    }

    @ApiOperation("설문조사1 추천")
    @GetMapping("/recommend1/{surveyId}")
    public ResponseEntity<? extends BaseResponseBody> recommendBySurvey1(@ApiIgnore Authentication authentication, @PathVariable("surveyId") Long surveyId) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        Survey1 survey1 = surveyService.getSurvey1ByUserAndSurveyId(user, surveyId);
        List<Perfume> recommendList = surveyService.recommendPerfumeBySurvey1(survey1);


        return ResponseEntity.ok(Survey1ResultResponse.of(200,"success",recommendList));
    }

    @ApiOperation("설문조사2 저장")
    @PostMapping("/2")
    public ResponseEntity<? extends BaseResponseBody> insertSurvey2(@ApiIgnore Authentication authentication, @RequestBody Survey2InsertRequest survey2InsertRequest) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        //설문조사1 저장 and 추천 (Service 안에서 설문조사 저장하고 recommendPerfumeBySurvey2 호출)
        Map<String, List<Perfume>> map = surveyService.insertSurvey2(user,survey2InsertRequest);
        //List<Perfume> recommendList = surveyService.insertSurvey2(user,survey2InsertRequest);

        return ResponseEntity.ok(Survey2ResultResponse.of(200,"설문조사2 등록 성공",map));
    }

    @ApiOperation("설문조사2 추천")
    @GetMapping("/recommend2/{survey2Id}")
    public ResponseEntity<? extends BaseResponseBody> recommendBySurvey2(@ApiIgnore Authentication authentication, @PathVariable("survey2Id") Long surveyId) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        Survey2 survey2 = surveyService.getSurvey2ByUserAndSurveyId(user, surveyId);
        Map<String, List<Perfume>> map = surveyService.recommendPerfumeBySurvey2(survey2);
        //List<Perfume> recommendList = surveyService.recommendPerfumeBySurvey2(survey2);


        return ResponseEntity.ok(Survey2ResultResponse.of(200,"success",map));
    }

    @ApiOperation("설문조사3 저장")
    @PostMapping("/3")
    public ResponseEntity<? extends BaseResponseBody> insertSurvey3(@ApiIgnore Authentication authentication,
                                                                    @ModelAttribute Survey3InsertRequest survey3InsertRequest) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        System.out.println(survey3InsertRequest.getImgFile().getOriginalFilename());
        System.out.println(survey3InsertRequest.getSurveyTitle());
        System.out.println(survey3InsertRequest.getClothesUrl());

        List<Perfume> recommendList = surveyService.insertSurvey3(user,survey3InsertRequest);

        return ResponseEntity.ok(Survey1ResultResponse.of(200,"설문조사3 등록 성공",recommendList));
    }

    @ApiOperation("설문조사3 추천")
    @GetMapping("/recommend3/{survey3Id}")
    public ResponseEntity<? extends BaseResponseBody> recommendBySurvey3(@ApiIgnore Authentication authentication, @ModelAttribute("survey3Id") Long surveyId) throws IOException {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        Survey3 survey3 = surveyService.getSurvey3ByUserAndSurveyId(user, surveyId);
        List<Perfume> perfumeList = surveyService.recommendPerfumeBySurvey3(survey3);


        return ResponseEntity.ok(Survey1ResultResponse.of(200,"success",perfumeList));
    }

    @ApiOperation("스타일 데이터 DB 추가")
    @GetMapping("/insertStyle")
    public ResponseEntity<BaseResponseBody> insertStyle(){

        //향수 브랜드 추가
        int[] time =    {0,0,0,1,2,2,2,2,0,0,1,1,2};
        int[] gender =  {0,2,0,1,2,2,2,2,1,0,1,1,2};
        int[] season =  {1,0,1,1,0,2,0,2,0,0,1,2,2};
        int[] tpo =     {0,1,0,1,2,2,2,2,2,2,1,1,3};
        int[] mood =    {1,0,0,1,2,2,2,2,3,3,4,1,4};

        for(int i=0; i<time.length; i++){
            Style insertStyle = new Style();
            insertStyle.setTime(time[i]);
            insertStyle.setGender(gender[i]);
            insertStyle.setSeason(season[i]);
            insertStyle.setTpo(tpo[i]);
            insertStyle.setMood(mood[i]);

            styleRepository.save(insertStyle);
        }

        return ResponseEntity.ok(BaseResponseBody.of(200,"DB 삽입 성공"));
    }

}
