/**
 *
 * RecentReviewListResponse
 * 최근 리뷰 리스트 리스폰스
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-04-05
 * 마지막 수정일 2022-04-05
 **/

package com.idle.api.response;

import com.idle.db.entity.Review;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Getter
@Setter
public class RecentReviewListResponse extends BaseResponseBody{

    List<Map<String, Object>> reviewList;

    public static RecentReviewListResponse of(Integer statusCode, String message, List<Review> recentReviewList) {
        RecentReviewListResponse res = new RecentReviewListResponse();
        List<Map<String, Object>> reviewList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        for(Review review : recentReviewList){
            Map<String, Object> reviewInfo = new HashMap<>();
            reviewInfo.put("perfumeId",review.getPerfume().getPerfumeId());
            reviewInfo.put("imgUrl",review.getPerfume().getImgUrl());
            reviewInfo.put("perfumeName",review.getPerfume().getPerfumeName());
            reviewInfo.put("perfumeBrand",review.getPerfume().getPerfumeBrand().getBrandName());
            reviewInfo.put("userNickname",review.getUser().getUserNickname());
            reviewInfo.put("reviewScore",review.getReviewScore());
            reviewInfo.put("reviewContent",review.getReviewContent());
            reviewList.add(reviewInfo);
        }

        res.setReviewList(reviewList);
        return res;
    }

}
