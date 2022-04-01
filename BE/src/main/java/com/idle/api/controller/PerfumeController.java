/**
 * PerfumeController
 * 향수 검색 API 구현
 *
 * @author Woody, David, Alice
 * @version 1.0.0
 * 생성일 2022/03/16
 * 마지막 수정일 2022/04/01
 **/
package com.idle.api.controller;

import com.idle.api.request.ReviewInsertRequest;
import com.idle.api.response.*;
import com.idle.api.service.PerfumeService;
import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.*;
import com.idle.db.repository.BrandRepository;
import com.idle.db.repository.PerfumeRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@CrossOrigin("*")
@Api(value = "향수 API", tags = {"Perfume"})
@RestController
@RequestMapping("/perfume")
public class PerfumeController {

    @Autowired
    private PerfumeService perfumeService;

    @Autowired
    private PerfumeRepository perfumeRepository;

    @Autowired
    private BrandRepository brandRepository;


    /* David  */
    @ApiOperation("향수 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<? extends BaseResponseBody> getPerfumeList(Pageable pageable) {
        Page<Perfume> perfumes = perfumeService.getPerfumeList(pageable);
        return ResponseEntity.ok(PerfumeListResponse.of(200, "Success", perfumes));
    }

    /* Woody */
    @ApiOperation("향수 검색")
    @GetMapping("/search")
    public ResponseEntity<? extends BaseResponseBody> perfumeSearchList(@RequestParam(value = "keyword") String keyword,
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

    /* David */
    @ApiOperation("향수 브랜드 조회")
    @GetMapping("/brand")
    public ResponseEntity<? extends BaseResponseBody> getBrandList() {

        List<Brand> brandList = perfumeService.getBrandList();
        return ResponseEntity.ok(BrandListResponse.of(200,"success",brandList));

    }

    /* David */
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

    /* David  */
    @ApiOperation("향수 리뷰 목록 조회")
    @GetMapping("/review/list/{perfumeId}")
    public ResponseEntity<? extends BaseResponseBody> getReviewList(Pageable pageable,@PathVariable("perfumeId")Long perfumeId) {
        Page<Review> reviews = perfumeService.getReviewList(pageable,perfumeId);
        return ResponseEntity.ok(ReviewListResponse.of(200, "Success", reviews));
    }

    /* David */
    @ApiOperation("향수 리뷰 수정")
    @PutMapping("/review")
    public ResponseEntity<? extends BaseResponseBody> updateReview(@ApiIgnore Authentication authentication, @RequestBody ReviewInsertRequest reviewInsertRequest){
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();

        String res = perfumeService.updateReview(user, reviewInsertRequest);
        if (res.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "리뷰 수정 실패"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"리뷰 수정 성공"));
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

    /* David */
    @ApiOperation("추천 향수 목록 조회")
    @GetMapping("/recommend/list")
    public ResponseEntity<? extends BaseResponseBody> getRecommendPerfumeList(@ApiIgnore Authentication authentication) {
        IdleUserDetails userDetails = (IdleUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Map<String,List<Perfume>> map = perfumeService.getRecommendPerfumeList(user);
        return ResponseEntity.status(200).body(RecommendPerfumeListResponse.of(200, "Success",map));
    }

    /* Alice */
    @ApiOperation("향수 데이터 DB 추가")
    @GetMapping("/insertperfume")
    public ResponseEntity<BaseResponseBody> insertPerfume() throws IOException {

        // 데이터셋 추가
        String filePath = "src/main/resources/perfume/perfumes.xlsx";
        File xlsx = new File(filePath);
        XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(xlsx));

        // 엑셀파일 전체 내용을 담고 있는 객체
        XSSFSheet sheet = wb.getSheetAt(0);
        XSSFRow row = null;

        // 탐색에 사용할 sheet 객체
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            row = sheet.getRow(i);
            Brand brand = brandRepository.findByBrandName(row.getCell(10).getStringCellValue()).get();
            Perfume perfume = new Perfume();

            perfume.setSeason((int)row.getCell(0).getNumericCellValue());
            perfume.setTime((int)row.getCell(1).getNumericCellValue());
            perfume.setGender((int)row.getCell(2).getNumericCellValue());
            perfume.setTpo((int)row.getCell(3).getNumericCellValue());
            perfume.setMood((int)row.getCell(4).getNumericCellValue());
            perfume.setGroup(row.getCell(5).getStringCellValue());
            perfume.setNote1(row.getCell(6).getStringCellValue());
            perfume.setNote2(row.getCell(7).getStringCellValue());
            perfume.setNote3(row.getCell(8).getStringCellValue());
            perfume.setPerfumeName(row.getCell(9).getStringCellValue());
            perfume.setPerfumeBrand(brand);
            perfume.setPerfumeScore(0);
            perfume.setReviewCnt(0);
            perfume.setLikeCnt(0);

            perfumeRepository.save(perfume);
        }

        return ResponseEntity.ok(BaseResponseBody.of(200,"DB 삽입 성공"));
    }
}
