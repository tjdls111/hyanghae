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


import com.idle.db.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface BrandRepository extends JpaRepository<Brand, ReviewId> {

    Optional<Brand> findByBrandName(String brandName);

}
