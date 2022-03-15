/**
 *
 * ReviewRepository
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-15
 * 마지막 수정일 2022-03-15
 **/
package com.idle.db.repository;


import com.idle.db.entity.Review;
import com.idle.db.entity.ReviewId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, ReviewId> {

}
