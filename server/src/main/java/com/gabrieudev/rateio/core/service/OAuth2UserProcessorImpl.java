package com.gabrieudev.rateio.core.service;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.domain.enums.AuthProvider;
import com.gabrieudev.rateio.core.exceptions.OAuth2AuthenticationProcessingException;
import com.gabrieudev.rateio.core.port.incoming.OAuth2UserProcessor;
import com.gabrieudev.rateio.core.port.outgoing.OAuth2UserInfoFactoryPort;
import com.gabrieudev.rateio.core.port.outgoing.OAuth2UserInfoPort;
import com.gabrieudev.rateio.core.port.outgoing.UserRepositoryPort;

import java.util.Optional;

@Service
public class OAuth2UserProcessorImpl implements OAuth2UserProcessor {

    private final UserRepositoryPort userRepository;
    private final OAuth2UserInfoFactoryPort oAuth2UserInfoFactory;

    public OAuth2UserProcessorImpl(UserRepositoryPort userRepository,
            OAuth2UserInfoFactoryPort oAuth2UserInfoFactory) {
        this.userRepository = userRepository;
        this.oAuth2UserInfoFactory = oAuth2UserInfoFactory;
    }

    @Override
    @Transactional
    public User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User)
            throws OAuth2AuthenticationProcessingException {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfoPort oAuth2UserInfo = oAuth2UserInfoFactory.getOAuth2UserInfo(registrationId,
                oAuth2User.getAttributes());

        if (!StringUtils.hasLength(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider().equals(AuthProvider.valueOf(registrationId))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(userRequest, oAuth2UserInfo);
        }
        return user;
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfoPort oAuth2UserInfo) {
        User user = new User();
        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfoPort oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }
}