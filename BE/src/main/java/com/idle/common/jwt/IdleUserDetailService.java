/**
 *
 * IdleUserDetailService
 * 토큰 기반으로 인증 받은 유저 Service
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-10
 * 마지막 수정일 2022-03-11
 **/
package com.idle.common.jwt;


import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class IdleUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserEmail(username).get();
        if (user != null) {
            IdleUserDetails userDetails = new IdleUserDetails(user);
            return userDetails;
        }
        return null;
    }
}
