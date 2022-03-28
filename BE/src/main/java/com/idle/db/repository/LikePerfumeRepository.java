/**
 *
 * LikePerfumeRepository
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-24
 **/
package com.idle.db.repository;


import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.Perfume;
import com.idle.db.entity.ReviewId;
import com.idle.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikePerfumeRepository extends JpaRepository<LikePerfume, ReviewId> {

    Optional<LikePerfume> findByUserAndPerfume(User user, Perfume perfume);
    Page<LikePerfume> findByUser(User user, Pageable pageable);
    int countByPerfume(Perfume perfume);

}
