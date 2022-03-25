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


import com.idle.db.entity.Perfume;
import com.idle.db.entity.Review;
import com.idle.db.entity.ReviewId;
import com.idle.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, ReviewId> {
    Optional<Review> findByUserAndPerfume(User user, Perfume perfume);
    Page<Review> findByPerfume(Pageable pageable, Perfume perfume);
}
