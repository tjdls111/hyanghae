/**
* PerfumeService
* 향수 검색, 향수 조회 함수 생성
*
* @author Woody, David
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/16
**/
package com.idle.api.service;

import com.idle.db.entity.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface PerfumeService {

    Page<Perfume> getPerfumeSearchPage(String keyword, String content, Pageable pageable);
    Page<Perfume> getPerfumeList(Pageable pageable);
    Perfume getPerfumeByPerfumeId(Long perfumeId);
}
