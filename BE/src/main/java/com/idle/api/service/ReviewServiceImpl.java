/**
 * ReviewServiceImpl
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-21
 * 마지막 수정일 2022-03-21
 **/
package com.idle.api.service;

import com.idle.api.request.ReviewInsertRequest;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.Review;
import com.idle.db.entity.User;
import com.idle.db.repository.PerfumeRepository;
import com.idle.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    PerfumeRepository perfumeRepository;

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

}
