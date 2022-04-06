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
import com.idle.db.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;


public interface PerfumeService {
    //향수
    Page<Perfume> getPerfumeSearchPage(String keyword, String content, Pageable pageable);
    Page<Perfume> getPerfumeList(Pageable pageable);
    Perfume getPerfumeByPerfumeId(Long perfumeId);
    List<Perfume> getPerfumeListBySeason(int season);
    //향수 브랜드
    List<Brand> getBrandList();
    Page<Perfume> getPerfumeListByBrand(Pageable pageable, String perfumeBrand, String content);
    //향수 리뷰
    String insertReview(User user, ReviewInsertRequest reviewInsertRequest);
    Page<Review> getReviewList(Pageable pageable,Long perfumeId);
    String updateReview(User user, ReviewInsertRequest reviewInsertRequest);
    String deleteReview(User user, Long perfumeId);
    List<Review> getRecentReviewList();
    //향수 좋아요
    String likePerfume(User user, Long perfumeId);
    Page<LikePerfume> getLikePerfumeList(User user, Pageable pageable);
    //향수 추천
    Map<String, List<Perfume>> getRecommendPerfumeList(User user);

}
