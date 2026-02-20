package com.gabrieudev.rateio.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String imageUrl;
    private Boolean emailVerified;
    private String provider;
    private String providerId;
}