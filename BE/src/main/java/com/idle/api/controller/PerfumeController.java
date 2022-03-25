/**
 * PerfumeController
 * 향수 검색 API 구현
 *
 * @author Woody, David
 * @version 1.0.0
 * 생성일 2022/03/16
 * 마지막 수정일 2022/03/24
 **/
package com.idle.api.controller;

import com.idle.api.request.ReviewInsertRequest;
import com.idle.api.response.BaseResponseBody;
import com.idle.api.response.LikePerfumeListResponse;
import com.idle.api.response.PerfumeListResponse;
import com.idle.api.response.PerfumeResponse;
import com.idle.api.service.PerfumeService;
import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;


@CrossOrigin("*")
@Api(value = "향수 API", tags = {"Perfume"})
@RestController
@RequestMapping("/perfume")
public class PerfumeController {

    @Autowired
    private PerfumeService perfumeService;


    /* David  */
    @ApiOperation("향수 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<PerfumeListResponse> getPerfumeList(Pageable pageable) {
        Page<Perfume> perfumes = perfumeService.getPerfumeList(pageable);
        return ResponseEntity.ok(PerfumeListResponse.of(200, "Success", perfumes));
    }

    /* Woody */
    @ApiOperation("향수 검색")
    @GetMapping("/search")
    public ResponseEntity<PerfumeListResponse> perfumeSearchList(@RequestParam(value = "keyword") String keyword,
                                                                 @RequestParam(value = "content") String content,
                                                                 @PageableDefault(size = 4, sort = "perfumeName", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<Perfume> page = perfumeService.getPerfumeSearchPage(keyword, content, pageable);
        return ResponseEntity.ok(PerfumeListResponse.of(200, "Success", page));
    }

    /* Woody */
    @ApiOperation("향수 상세 정보")
    @GetMapping("/{perfumeId}")
    public ResponseEntity<PerfumeResponse> getPerfume(@PathVariable("perfumeId") @ApiParam(value = "향수 번호", required = true) long perfumeId) {

        Perfume perfume = perfumeService.getPerfumeByPerfumeId(perfumeId);

        if (perfume == null) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(200).body(PerfumeResponse.of(perfume));
    }

    @ApiOperation("향수 리뷰 작성")
    @PostMapping("/review")
    public ResponseEntity<? extends BaseResponseBody> insertReview(@ApiIgnore Authentication authentication, @RequestBody ReviewInsertRequest reviewInsertRequest) {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        String res = perfumeService.insertReview(user, reviewInsertRequest);
        if (res.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"리뷰 등록 실패"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"리뷰 등록 성공"));

    }

    /* David */
    @ApiOperation("향수 리뷰 수정")
    @PutMapping("/review")
    public ResponseEntity<? extends BaseResponseBody> updateReview(@ApiIgnore Authentication authentication, @RequestBody ReviewInsertRequest reviewInsertRequest){
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        String res = perfumeService.updateReview(user, reviewInsertRequest);
        if (res.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "리뷰 삭제 실패"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"리뷰 삭제 성공"));
    }

    /* David */
    @ApiOperation("향수 리뷰 삭제")
    @DeleteMapping("/review/{perfumeId}")
    public ResponseEntity<? extends BaseResponseBody> deleteReview(@ApiIgnore Authentication authentication, @PathVariable("perfumeId") Long perfumeId){
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        String res = perfumeService.deleteReview(user, perfumeId);
        if (res.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "리뷰 삭제 실패"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"리뷰 삭제 성공"));
    }

    /* David */
    @ApiOperation("향수 좋아요 등록/해제")
    @GetMapping("/like/{perfumeId}")
    public ResponseEntity<? extends BaseResponseBody> likePerfume(@ApiIgnore Authentication authentication,
                                                                  @PathVariable("perfumeId") @ApiParam(value = "향수 번호", required = true) long perfumeId) {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();
        System.out.println(user.getUserNickname());

        String res = perfumeService.likePerfume(user, perfumeId);
        if (res.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "좋아요 등록 실패"));
        } else if (res.equals("clear")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(200, "좋아요 해제"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "좋아요 등록"));
    }

    /* David */
    @ApiOperation("향수 좋아요 목록 조회")
    @GetMapping("/like/list")
    public ResponseEntity<? extends BaseResponseBody> getLikePerfumeList(@ApiIgnore Authentication authentication, Pageable pageable) {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        Page<LikePerfume> res = perfumeService.getLikePerfumeList(user, pageable);

        return ResponseEntity.status(200).body(LikePerfumeListResponse.of(200, "Success",res));
    }
}
