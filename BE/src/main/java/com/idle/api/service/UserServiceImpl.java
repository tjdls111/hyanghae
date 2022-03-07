package com.idle.api.service;


import com.idle.api.request.UserRegisterPostReq;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public void createUser(UserRegisterPostReq userRegisterInfo) {
        User user = User.builder()
                .userId(userRegisterInfo.getUserId())
                .userPw(userRegisterInfo.getUserPw())
                .userEmail(userRegisterInfo.getUserEmail())
                .userNickname(userRegisterInfo.getUserNickname())
                .build();

        userRepository.save(user);
    }
}
