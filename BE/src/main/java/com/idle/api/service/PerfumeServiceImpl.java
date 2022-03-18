/**
* PerfumeServiceImpl
* 향수 검색, 향수 조회 기능 구현
*
* @author Woody
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/16
**/
package com.idle.api.service;

import com.idle.db.entity.Perfume;
import com.idle.db.repository.PerfumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service("perfumeService")
public class PerfumeServiceImpl implements PerfumeService{

    @Autowired
    PerfumeRepository perfumeRepository;

    @Override
    public Map<String, Object> getPerfumeSearchPage(String keyword, String content, Pageable pageable) {
        Map<String, Object> map = new HashMap<>();

        if(keyword.equals("perfumeName")){
            Page page = perfumeRepository.findByPerfumeNameContaining(content, pageable);
            map.put("perfumeList",page.getContent());
            map.put("isLast",page.isLast());
        } else if(keyword.equals("brand")) {
            Page page = perfumeRepository.findByPerfumeBrandContaining(content, pageable);
            map.put("perfumeList",page.getContent());
            map.put("isLast",page.isLast());
        }
        return map;
    }

    /* David : 향수 목록 조회 */
    @Override
    public Page<Perfume> getPerfumeList(Pageable pageable) {
        Page<Perfume> perfumes = perfumeRepository.findAll(pageable);
        return perfumes;
    }

    /* Woody */
    @Override
    public Perfume getPerfumeByPerfumeId(Long perfumeId) {
        Perfume perfume = perfumeRepository.findByPerfumeId(perfumeId).orElse(null);
        return perfume;
    }

}
