package com.gabrieudev.rateio.infrastructure.adapter.outgoing.security.oauth2.user;

import java.util.Map;

import com.gabrieudev.rateio.core.port.outgoing.OAuth2UserInfoPort;

public class GithubOAuth2UserInfo implements OAuth2UserInfoPort {
    private Map<String, Object> attributes;

    public GithubOAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getId() {
        return ((Integer) attributes.get("id")).toString();
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("avatar_url");
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
}