package com.gabrieudev.rateio.domain.port;

import java.util.Optional;

import com.gabrieudev.rateio.domain.model.User;

public interface UserRepositoryPort {
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    User save(User user);

    boolean existsByEmail(String email);

    Optional<User> findByEmailVerificationToken(String token);
}