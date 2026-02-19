package com.gabrieudev.rateio.core.port.incoming;

import com.gabrieudev.rateio.core.domain.AuthResponse;
import com.gabrieudev.rateio.core.domain.SignUpRequest;
import com.gabrieudev.rateio.core.domain.User;

public interface AuthenticationUseCase {
    AuthResponse authenticate(String email, String password);

    User registerUser(SignUpRequest signUpRequest);
}