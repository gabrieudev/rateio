package com.gabrieudev.rateio.application.usecase;

import org.springframework.stereotype.Service;

import com.gabrieudev.rateio.application.dto.LoginRequest;
import com.gabrieudev.rateio.domain.model.User;
import com.gabrieudev.rateio.domain.port.AuthenticationPort;

@Service
public class LoginUseCase {

    private final AuthenticationPort authenticationPort;

    public LoginUseCase(AuthenticationPort authenticationPort) {
        this.authenticationPort = authenticationPort;
    }

    public User execute(LoginRequest request) {
        return authenticationPort.authenticate(request.getEmail(), request.getPassword());
    }
}