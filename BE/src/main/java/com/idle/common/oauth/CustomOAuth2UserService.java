/**
 *
 * CustomOAuth2UserService
 * 소셜 로그인 이후 가져온 사용자의 정보를 기반으로 가입 및 정보수정
 *
 * @author SSAFY
 * @version 1.0.0
 * 생성일 2022-03-10
 * 마지막 수정일 2022-03-10
 **/

package com.idle.common.oauth;


import com.idle.common.oauth.dto.OAuthAttributes;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 현재 로그인 진행 중인 서비스를 구분 ( 구글 or 네이버)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName(); // 로그인 진행시 키가 되는 필드값

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes()); // OAuth2UserService 를 통해 가져온 로그인 유저 데이터 값

        User user = saveOrUpdate(attributes);


        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(user.getUserId())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }


    private User saveOrUpdate(OAuthAttributes attributes) {
        User user = userRepository.findByUserId(attributes.getEmail())
                .map(entity -> entity.updateUserNickname(attributes.getName()))
                .orElse(attributes.toEntity());


        return userRepository.save(user);
    }

}
