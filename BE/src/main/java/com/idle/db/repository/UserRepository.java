/**
 *
 * UserRepository
 * findByUserId 함수 생성
 *
 * @author David, Alice
 * @version 1.0.0
 * 생성일 2022-03-07
 * 마지막 수정일 2022-03-10
 **/
package com.idle.db.repository;

import com.idle.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userId);   // 유저 아이디로 검색
}
