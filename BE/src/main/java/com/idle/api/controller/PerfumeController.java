/**
* PerfumeController
* 향수 검색 API 구현
*
* @author Woody
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/16
**/
package com.idle.api.controller;

import com.idle.api.response.PerfumeListRes;
import com.idle.api.service.PerfumeService;
import com.idle.db.entity.Perfume;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/perfume")
public class PerfumeController {

    @Autowired
    private PerfumeService perfumeService;

    /* Woody */
    @ApiOperation("향수 검색")
    @GetMapping("/search")
    public ResponseEntity<PerfumeListRes> perfumeSearchList(@RequestParam(value = "keyword") String keyword,
                                                          @RequestParam(value = "content") String content,
                                                          @PageableDefault(size=4, sort = "perfumeName", direction = Sort.Direction.ASC) Pageable pageable) {
        Map<String,Object> map = perfumeService.getPerfumeSearchPage(keyword, content, pageable);
        return ResponseEntity.status(200).body(PerfumeListRes.of(200, "Success", (List<Perfume>) map.get("perfumeList"), (Boolean) map.get("isLast")));
    }
}
