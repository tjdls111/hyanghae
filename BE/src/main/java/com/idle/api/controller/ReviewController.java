/**
 *
 * ReviewController
 *
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-21
 * 마지막 수정일 2022-03-21
 **/
package com.idle.api.controller;

import com.idle.api.request.ReviewInsertRequest;
import com.idle.api.response.BaseResponseBody;
import com.idle.api.service.ReviewService;
import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@CrossOrigin("*")
@Api(value = "리뷰 API", tags = {"Review"})
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @ApiOperation("향수 리뷰 작성")
    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> insertReview(@ApiIgnore Authentication authentication, @RequestBody ReviewInsertRequest reviewInsertRequest) {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        String res = reviewService.insertReview(user, reviewInsertRequest);
        if (res.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"리뷰 등록 실패"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"리뷰 등록 성공"));

    }
}
