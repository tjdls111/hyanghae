/**
 *
 * ReviewListResponse
 * 향수 리뷰 목록 조회
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-25
 * 마지막 수정일 2022-03-25
 **/

package com.idle.api.response;


import com.idle.db.entity.Review;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ReviewListResponse extends BaseResponseBody{

    Long totalElements;
    int totalPages;
    int pageNumber;
    boolean first;
    boolean last;
    List<Map<String, Object>> reviewList;

    public static ReviewListResponse of(Integer statusCode, String message, Page<Review> reviews) {
        ReviewListResponse res = new ReviewListResponse();
        List<Map<String, Object>> reviewList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTotalElements(reviews.getTotalElements());
        res.setTotalPages(reviews.getTotalPages());
        res.setPageNumber(reviews.getPageable().getPageNumber());
        res.setFirst(reviews.isFirst());
        res.setLast(reviews.isLast());

        for(Review review : reviews.getContent()){
            Map<String, Object> reviewInfo = new HashMap<>();
            reviewInfo.put("userNickname",review.getUser().getUserNickname());
            reviewInfo.put("reviewScore",review.getReviewScore());
            reviewInfo.put("reviewContent",review.getReviewContent());
            reviewInfo.put("createDate",review.getCreateDate());
            reviewList.add(reviewInfo);
        }

        res.setReviewList(reviewList);

        return res;

    }
}

