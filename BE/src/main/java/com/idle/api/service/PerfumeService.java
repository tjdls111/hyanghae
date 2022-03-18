/**
* PerfumeService
*
*
* @author Woody
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/16
**/
package com.idle.api.service;

import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface PerfumeService {

    Map<String, Object> getPerfumeSearchPage(String keyword, String content, Pageable pageable);
}
