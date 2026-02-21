package com.gabrieudev.rateio.infrastructure.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.gabrieudev.rateio.application.mapper.UserMapper;
import com.gabrieudev.rateio.domain.model.User;
import com.gabrieudev.rateio.domain.port.AuthenticationPort;
import com.gabrieudev.rateio.application.dto.UserResponse;

@Component
public class AuthenticationAdapter implements AuthenticationPort {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final UserMapper userMapper;

    public AuthenticationAdapter(AuthenticationManager authenticationManager,
            CustomUserDetailsService userDetailsService, UserMapper userMapper) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userMapper = userMapper;
    }

    @Override
    public User authenticate(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        return userMapper.toDomain((UserResponse) userDetailsService.loadUserById(principal.getId()));
    }
}