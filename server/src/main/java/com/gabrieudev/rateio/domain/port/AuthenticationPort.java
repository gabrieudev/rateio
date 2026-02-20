package com.gabrieudev.rateio.domain.port;

import com.gabrieudev.rateio.domain.model.User;

public interface AuthenticationPort {
    User authenticate(String email, String password);
}