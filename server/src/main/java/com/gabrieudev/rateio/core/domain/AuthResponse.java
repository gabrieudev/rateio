package com.gabrieudev.rateio.core.domain;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public AuthResponse() {
    }

}
