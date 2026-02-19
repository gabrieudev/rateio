package com.gabrieudev.rateio.core.port.outgoing;

import java.util.Optional;

import com.gabrieudev.rateio.core.domain.User;

public interface UserRepositoryPort {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> save(User user);

    Optional<User> findById(Long id);
}