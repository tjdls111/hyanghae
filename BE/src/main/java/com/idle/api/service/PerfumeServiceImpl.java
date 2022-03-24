/**
* PerfumeServiceImpl
* 향수 검색, 향수 조회 기능 구현
*
* @author Woody
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/24
**/
package com.idle.api.service;

import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.User;
import com.idle.db.repository.LikePerfumeRepository;
import com.idle.db.repository.PerfumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service("perfumeService")
public class PerfumeServiceImpl implements PerfumeService{

    @Autowired
    PerfumeRepository perfumeRepository;
    @Autowired
    LikePerfumeRepository likePerfumeRepository;

    @Override
    public Page<Perfume> getPerfumeSearchPage(String keyword, String content, Pageable pageable) {
        Page<Perfume> page = null;
        if(keyword.equals("perfumeName")){
            page = perfumeRepository.findByPerfumeNameContaining(content, pageable);

        } else if(keyword.equals("brand")) {
            page = perfumeRepository.findByPerfumeBrandContaining(content, pageable);

        }
        return page;
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

    /* David : 향수 좋아요 등록/해제 */
    @Override
    public String likePerfume(User user, Long perfumeId) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(perfumeId);
        if(!checkPerfume.isPresent()){
            return "fail";
        }
        Optional<LikePerfume> checkLikePerfume  = likePerfumeRepository.findByUserAndPerfume(user, checkPerfume.get());
        if(checkLikePerfume.isPresent()){
            likePerfumeRepository.delete(checkLikePerfume.get());
            return "clear";
        }
        LikePerfume likePerfume = new LikePerfume(user,checkPerfume.get());
        likePerfumeRepository.save(likePerfume);
        return "register";
    }

}
