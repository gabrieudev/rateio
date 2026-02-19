package com.gabrieudev.rateio.infrastructure.adapter.inbound.web.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
}