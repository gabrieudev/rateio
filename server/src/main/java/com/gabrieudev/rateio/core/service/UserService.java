package com.gabrieudev.rateio.core.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.exceptions.ResourceNotFoundException;
import com.gabrieudev.rateio.core.port.incoming.UserUseCase;
import com.gabrieudev.rateio.core.port.outgoing.UserRepositoryPort;

@Service
public class UserService implements UserUseCase {

    private final UserRepositoryPort userRepository;

    public UserService(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public User getCurrentUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}