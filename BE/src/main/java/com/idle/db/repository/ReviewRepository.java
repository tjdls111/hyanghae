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


import com.idle.db.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, ReviewId> {
    Optional<Review> findByUserAndPerfume(User user, Perfume perfume);
    Page<Review> findByPerfume(Pageable pageable, Perfume perfume);
    int countByPerfume(Perfume perfume);
    List<Review> findTop10ByOrderByCreateDateDesc();

    @Query(value ="SELECT AVG(r_score) FROM Review r WHERE r.p_id = ?1",nativeQuery = true)
    float findAvgWithJPQL(Long perfumeId);
}
