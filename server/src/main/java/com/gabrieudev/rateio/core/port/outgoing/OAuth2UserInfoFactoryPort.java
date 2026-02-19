package com.gabrieudev.rateio.core.port.outgoing;

import java.util.Map;

import com.gabrieudev.rateio.core.exceptions.OAuth2AuthenticationProcessingException;

public interface OAuth2UserInfoFactoryPort {
    OAuth2UserInfoPort getOAuth2UserInfo(String registrationId, Map<String, Object> attributes)
            throws OAuth2AuthenticationProcessingException;
}