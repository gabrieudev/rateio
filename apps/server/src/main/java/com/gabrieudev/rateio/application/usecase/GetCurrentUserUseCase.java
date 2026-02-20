package com.gabrieudev.rateio.application.usecase;

import org.springframework.stereotype.Service;

import com.gabrieudev.rateio.application.exception.ResourceNotFoundException;
import com.gabrieudev.rateio.domain.model.User;
import com.gabrieudev.rateio.domain.port.UserRepositoryPort;

@Service
public class GetCurrentUserUseCase {

    private final UserRepositoryPort userRepository;

    public GetCurrentUserUseCase(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    public User execute(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
}