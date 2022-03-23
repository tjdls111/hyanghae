/**
* PerfumeController
* 향수 검색 API 구현
*
* @author Woody, David
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/16
**/
package com.idle.api.controller;

import com.idle.api.response.PerfumeListRes;
import com.idle.api.response.PerfumeListResponse;
import com.idle.api.response.PerfumeResponse;
import com.idle.api.service.PerfumeService;
import com.idle.db.entity.Perfume;
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
import java.util.Map;

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
        Page<Perfume> perfumes =  perfumeService.getPerfumeList(pageable);
        return ResponseEntity.ok(PerfumeListResponse.of(200,"Success",perfumes));
    }

    /* Woody */
    @ApiOperation("향수 검색")
    @GetMapping("/search")
    public ResponseEntity<PerfumeListResponse> perfumeSearchList(@RequestParam(value = "keyword") String keyword,
                                                          @RequestParam(value = "content") String content,
                                                          @PageableDefault(size=4, sort = "perfumeName", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<Perfume> page = perfumeService.getPerfumeSearchPage(keyword, content, pageable);
        return ResponseEntity.ok(PerfumeListResponse.of(200,"Success",page));
    }

    /* Woody */
    @ApiOperation("향수 상세 정보")
    @GetMapping("/{perfumeId}")
    public ResponseEntity<PerfumeResponse> getPerfume(@PathVariable("perfumeId") @ApiParam(value = "향수 번호", required = true) long perfumeId)  {

        Perfume perfume = perfumeService.getPerfumeByPerfumeId(perfumeId);

        if(perfume == null){
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(200).body(PerfumeResponse.of(perfume));
    }
}
