package com.gabrieudev.rateio.core.port.outgoing;

import org.springframework.security.core.Authentication;

public interface TokenServicePort {
    String createToken(Authentication authentication);

    Long getUserIdFromToken(String token);

    boolean validateToken(String token);
}