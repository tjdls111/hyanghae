/**
*
* UserServiceImpl
* 회원가입 insertUser 함수 생성
* 회원가입을 위한 checkUserId 함수 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-10
* 마지막 수정일 2022-03-10
**/
package com.idle.api.service;

import com.idle.api.request.UserSignUpRequest;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;


    /* Alice */
    @Override
    public String insertUser(UserSignUpRequest userSignUpRequest) {
        User user = userSignUpRequest.toEntity();
        user.setUserPw("{noop}" + user.getUserPw());    // Security ver5 부터 명칭 해줘야함
        userRepository.save(user);
        return "success";
    }

    /* Alice */
    @Override
    public String checkUserId(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    /* Alice */
    @Override
    public String checkUserNickname(String userNickname) {
        Optional<User> user = userRepository.findByUserNickname(userNickname);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    /* Woody */
    @Override
    public String checkUserPw(String userPw) {
        Optional<User> user = userRepository.findByUserPw(userPw);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

}
