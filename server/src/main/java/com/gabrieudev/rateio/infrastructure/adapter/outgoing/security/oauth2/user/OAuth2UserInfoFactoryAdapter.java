package com.gabrieudev.rateio.infrastructure.adapter.outgoing.security.oauth2.user;

import org.springframework.stereotype.Component;

import com.gabrieudev.rateio.core.exceptions.OAuth2AuthenticationProcessingException;
import com.gabrieudev.rateio.core.port.outgoing.OAuth2UserInfoFactoryPort;
import com.gabrieudev.rateio.core.port.outgoing.OAuth2UserInfoPort;

import java.util.Map;

@Component
public class OAuth2UserInfoFactoryAdapter implements OAuth2UserInfoFactoryPort {

    @Override
    public OAuth2UserInfoPort getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase("google")) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase("github")) {
            return new GithubOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException(
                    "Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}