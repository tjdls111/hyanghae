/**
 *
 * IdleUserDetails
 * 토큰 기반으로 인증 받은 유저의 Dto
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-10
 * 마지막 수정일 2022-03-11
 **/
package com.idle.common.jwt.dto;


import com.idle.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class IdleUserDetails implements UserDetails {
    @Autowired
    User user;
    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;
    List<GrantedAuthority> roles = new ArrayList<>();

    public IdleUserDetails(User user) {
        super();
        this.user = user;
    }

    public User getUser() {
        return this.user;
    }


    @Override
    public String getPassword() { return this.user.getUserPw(); }

    @Override
    public String getUsername() {
        return this.user.getUserId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    public void setAuthorities(List<GrantedAuthority> roles) {
        this.roles = roles;
    }
}
