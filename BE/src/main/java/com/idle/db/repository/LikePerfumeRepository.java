/**
 *
 * LikePerfumeRepository
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-14
 **/
package com.idle.db.repository;


import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.ReviewId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikePerfumeRepository extends JpaRepository<LikePerfume, ReviewId> {

}
