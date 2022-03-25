/**
 *
 * PerfumeRepository
 *
 * @author David, Woody
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-25
 **/
package com.idle.db.repository;


import com.idle.db.entity.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
    Optional<Perfume> findByPerfumeId(Long perfumeid);
    Page<Perfume> findByPerfumeNameContaining(String content, Pageable pageable);
    Page<Perfume> findByPerfumeBrandContaining(String content, Pageable pageable);

    List<Perfume> findByMoodGreaterThan(int mood);

}
