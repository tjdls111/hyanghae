package com.idle.api.service;

import com.idle.api.request.UserRegisterPostReq;


public interface UserService {
    void createUser(UserRegisterPostReq userRegisterInfo);
}
