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

import com.google.common.collect.Lists;
import com.idle.api.request.ReviewInsertRequest;
import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.Review;
import com.idle.db.entity.User;
import com.idle.db.repository.LikePerfumeRepository;
import com.idle.db.repository.PerfumeRepository;
import com.idle.db.repository.ReviewRepository;
import com.idle.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service("perfumeService")
public class PerfumeServiceImpl implements PerfumeService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    PerfumeRepository perfumeRepository;

    @Autowired
    ReviewRepository reviewRepository;

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

    /* David : 향수 리뷰 작성 */
    @Override
    public String insertReview(User user, ReviewInsertRequest reviewInsertRequest) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(reviewInsertRequest.getPerfumeId());
        Optional<Review> checkReview = reviewRepository.findByUserAndPerfume(user, checkPerfume.get());
        if (!checkPerfume.isPresent() || checkReview.isPresent()) {
            return "fail";
        } else {
            Review review = Review.builder()
                    .user(user)
                    .perfume(checkPerfume.get())
                    .reviewTitle(reviewInsertRequest.getReviewTitle())
                    .reviewContent(reviewInsertRequest.getReviewContent())
                    .reviewScore(reviewInsertRequest.getReviewScore())
                    .build();
            reviewRepository.save(review);
            return "success";
        }

    }

    /* David : 향수 리뷰 목록 조회 */
    @Override
    public Page<Review> getReviewList(Pageable pageable,Long perfumeId) {
        Perfume perfume = perfumeRepository.findByPerfumeId(perfumeId).get();
        Page<Review> reviews = reviewRepository.findByPerfume(pageable, perfume);
        return reviews;
    }

    /* David : 향수 리뷰 수정 */
    @Override
    public String updateReview(User user, ReviewInsertRequest reviewInsertRequest) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(reviewInsertRequest.getPerfumeId());
        Optional<Review> checkReview = reviewRepository.findByUserAndPerfume(user, checkPerfume.get());
        if (!checkPerfume.isPresent() || !checkReview.isPresent()) {
            return "fail";
        } else {
            checkReview.get().setReviewScore(reviewInsertRequest.getReviewScore());
            checkReview.get().setReviewTitle(reviewInsertRequest.getReviewTitle());
            checkReview.get().setReviewContent(reviewInsertRequest.getReviewContent());
            reviewRepository.save(checkReview.get());
            return "success";
        }
    }

    /* David : 향수 리뷰 삭제 */
    @Override
    public String deleteReview(User user, Long perfumeId) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(perfumeId);
        Optional<Review> checkReview = reviewRepository.findByUserAndPerfume(user, checkPerfume.get());
        if (!checkPerfume.isPresent() || !checkReview.isPresent()) {
            return "fail";
        }else{
            reviewRepository.delete(checkReview.get());
            return "success";
        }

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

    /* David : 향수 좋아요 목록 조회 */
    @Override
    public Page<LikePerfume> getLikePerfumeList(User user, Pageable pageable) {
        Page<LikePerfume> likePerfumes = likePerfumeRepository.findByUser(user, pageable);
        return likePerfumes;
    }

}
