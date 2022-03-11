/**
*
* UserServiceImpl
* 회원가입, 아이디 중복 검사, 닉네임 중복 검사, 비밀번호 암호화, 로그인 함수 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-10
* 마지막 수정일 2022-03-11
**/
package com.idle.api.service;

import com.idle.api.request.UserLoginRequest;
import com.idle.api.request.UserSignUpRequest;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* Alice : 회원가입 */
    @Override
    public String insertUser(UserSignUpRequest userSignUpRequest) {
        User user = userSignUpRequest.toEntity();
        String userPw = passwordEncode(user.getUserPw());   // 비밀번호 인코딩
        user.setUserPw(userPw);    // Security ver5 부터 명칭 해줘야함
        userRepository.save(user);
        return "success";
    }

    /* Alice : 아이디 중복 검사 */
    @Override
    public String checkDuplicateUserId(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    /* Alice : 닉네임 중복 검사 */
    @Override
    public String checkDuplicateUserNickname(String userNickname) {
        Optional<User> user = userRepository.findByUserNickname(userNickname);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    /* Alice : 로그인 */
    @Override
    public String login(UserLoginRequest userLoginRequest) {
        Optional<User> user = userRepository.findByUserId(userLoginRequest.getUserId());
        if(!user.isPresent()){
            return "fail";
        }
        if (!passwordEncoder.matches(userLoginRequest.getUserPw(), user.get().getUserPw())) {
            return "fail";
        }
        System.out.println("유저에게 받은 비밀번호 : " + userLoginRequest.getUserPw());
        System.out.println("DB에 있는 암호화된 비밀번호 : " + user.get().getUserPw());
        return "success";
    }

    /* Alice */
    @DisplayName("패스워드 암호화")
    public String passwordEncode(String userPw){
        String encodedPassword = passwordEncoder.encode(userPw);

        assertAll(
                () -> assertNotEquals(userPw, encodedPassword),
                () -> assertTrue(passwordEncoder.matches(userPw, encodedPassword))
        );
        return encodedPassword;
    }

}
