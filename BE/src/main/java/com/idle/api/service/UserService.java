/**
*
* UserService
* 회원가입, 아이디 중복 검사, 닉네임 중복 검사, 비밀번호 암호화 함수 생성
*
* @author Alice, David, Woody
* @version 1.0.0
* 생성일 2022-03-08
* 마지막 수정일 2022-03-21
**/
package com.idle.api.service;

import com.idle.api.request.*;
import com.idle.db.entity.LikePerfume;
import com.idle.db.entity.User;

import java.util.List;
import java.util.Set;


public interface UserService {
    String insertUser(UserSignUpRequest userSignUpRequest);
    boolean checkUserPw(User user, String userPw);
    String checkDuplicateUserId(String userId);
    String checkDuplicateUserNickname(String userNickname);
    String sendUserEmailNumber(String userEmail);
    String login(UserLoginRequest userLoginRequest);
    String passwordEncode(String userPw);
    List<User> findUserIdByUserEmail(String userEmail);
    User getUserByUserId(String userId);
    String updateUserNickname(UserNicknameUpdateRequest userNicknameUpdateRequest, User user);
    void updateUser(UserUpdateRequest userUpdateReq, User user);
    void updateUserPw(UserCheckPwRequest userCheckPwRequest, User user);
    void deleteUser(User user);
    String findUserPw(UserPwRequest userPwRequest);
    Set<LikePerfume> getLikePerfumeList(User user);
}
