package com.gabrieudev.rateio.core.port.outgoing;

public interface PasswordEncoderPort {
    String encode(CharSequence rawPassword);

    boolean matches(CharSequence rawPassword, String encodedPassword);
}