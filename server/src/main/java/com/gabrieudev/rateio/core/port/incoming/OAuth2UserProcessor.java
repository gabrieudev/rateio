package com.gabrieudev.rateio.core.port.incoming;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.exceptions.OAuth2AuthenticationProcessingException;

public interface OAuth2UserProcessor {
    User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User)
            throws OAuth2AuthenticationProcessingException;
}