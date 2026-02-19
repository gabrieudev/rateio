package com.gabrieudev.rateio.infrastructure.adapter.inbound.security.oauth2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.port.incoming.OAuth2UserProcessor;
import com.gabrieudev.rateio.infrastructure.adapter.inbound.security.UserPrincipal;
import com.gabrieudev.rateio.infrastructure.mapper.UserMapper;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private OAuth2UserProcessor oAuth2UserProcessor;

    private final UserMapper userMapper;

    public CustomOAuth2UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            User user = oAuth2UserProcessor.processOAuth2User(oAuth2UserRequest, oAuth2User);
            return UserPrincipal.create(userMapper.toEntity(user), oAuth2User.getAttributes());
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }
}