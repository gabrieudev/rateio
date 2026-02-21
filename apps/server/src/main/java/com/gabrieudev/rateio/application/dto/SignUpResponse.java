package com.gabrieudev.rateio.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpResponse {
    private boolean success;
    private String message;
    private String emailVerificationToken;
}
