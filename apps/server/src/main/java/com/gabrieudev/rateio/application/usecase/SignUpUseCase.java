package com.gabrieudev.rateio.application.usecase;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.gabrieudev.rateio.application.dto.SignUpRequest;
import com.gabrieudev.rateio.application.exception.BadRequestException;
import com.gabrieudev.rateio.domain.model.AuthProvider;
import com.gabrieudev.rateio.domain.model.User;
import com.gabrieudev.rateio.domain.port.PasswordEncoderPort;
import com.gabrieudev.rateio.domain.port.UserRepositoryPort;

@Service
public class SignUpUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordEncoderPort passwordEncoder;
    private static final long TOKEN_EXPIRATION_HOURS = 24;

    public SignUpUseCase(UserRepositoryPort userRepository, PasswordEncoderPort passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User execute(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email já está em uso.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setProvider(AuthProvider.local);

        String token = UUID.randomUUID().toString();
        user.setEmailVerificationToken(token);
        user.setEmailVerificationTokenExpiry(LocalDateTime.now().plusHours(TOKEN_EXPIRATION_HOURS));

        return userRepository.save(user);
    }
}