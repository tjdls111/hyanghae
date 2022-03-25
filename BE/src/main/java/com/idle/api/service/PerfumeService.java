/**
* PerfumeService
* 향수 검색, 향수 조회, 향수 좋아요 함수 생성
*
* @author Woody, David
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/24
**/
package com.idle.api.service;

import com.idle.api.request.ReviewInsertRequest;
import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PerfumeService {
    //향수
    Page<Perfume> getPerfumeSearchPage(String keyword, String content, Pageable pageable);
    Page<Perfume> getPerfumeList(Pageable pageable);
    Perfume getPerfumeByPerfumeId(Long perfumeId);
    //향수 리뷰
    String insertReview(User user, ReviewInsertRequest reviewInsertRequest);
    String updateReview(User user, ReviewInsertRequest reviewInsertRequest);
    String deleteReview(User user, Long perfumeId);
    //향수 좋아요
    String likePerfume(User user, Long perfumeId);
    Page<LikePerfume> getLikePerfumeList(User user, Pageable pageable);

}
