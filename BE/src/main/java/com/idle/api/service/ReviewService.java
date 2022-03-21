/**
 *
 * ReviewService
 *
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-21
 * 마지막 수정일 2022-03-21
 **/
package com.idle.api.service;

import com.idle.api.request.ReviewInsertRequest;
import com.idle.db.entity.User;


public interface ReviewService {
    String insertReview(User user, ReviewInsertRequest reviewInsertRequest);

}
