/**
 *
 * UserRepository
 *
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-07
 * 마지막 수정일 2022-03-07
 **/
package com.idle.db.repository;

import com.idle.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {
}
