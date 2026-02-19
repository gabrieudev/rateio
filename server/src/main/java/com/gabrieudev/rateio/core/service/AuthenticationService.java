package com.gabrieudev.rateio.core.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gabrieudev.rateio.core.domain.AuthResponse;
import com.gabrieudev.rateio.core.domain.SignUpRequest;
import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.domain.enums.AuthProvider;
import com.gabrieudev.rateio.core.exceptions.BadRequestException;
import com.gabrieudev.rateio.core.port.incoming.AuthenticationUseCase;
import com.gabrieudev.rateio.core.port.outgoing.PasswordEncoderPort;
import com.gabrieudev.rateio.core.port.outgoing.TokenServicePort;
import com.gabrieudev.rateio.core.port.outgoing.UserRepositoryPort;

@Service
public class AuthenticationService implements AuthenticationUseCase {

    private final AuthenticationManager authenticationManager;
    private final UserRepositoryPort userRepository;
    private final PasswordEncoderPort passwordEncoder;
    private final TokenServicePort tokenService;

    public AuthenticationService(AuthenticationManager authenticationManager,
            UserRepositoryPort userRepository,
            PasswordEncoderPort passwordEncoder,
            TokenServicePort tokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Override
    @Transactional
    public AuthResponse authenticate(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenService.createToken(authentication);
        return new AuthResponse(token);
    }

    @Override
    @Transactional
    public User registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
}