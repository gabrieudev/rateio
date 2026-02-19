package com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.port.outgoing.UserRepositoryPort;
import com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence.repository.SpringDataUserRepository;
import com.gabrieudev.rateio.infrastructure.mapper.UserMapper;

@Component
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final SpringDataUserRepository springDataUserRepository;

    private final UserMapper userMapper;

    public UserRepositoryAdapter(SpringDataUserRepository springDataUserRepository, UserMapper userMapper) {
        this.springDataUserRepository = springDataUserRepository;
        this.userMapper = userMapper;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return springDataUserRepository.findByEmail(email).map(userMapper::toDomain);
    }

    @Override
    public boolean existsByEmail(String email) {
        return springDataUserRepository.existsByEmail(email);
    }

    @Override
    public Optional<User> save(User user) {
        return Optional.ofNullable(springDataUserRepository.save(userMapper.toEntity(user)))
                .map(userMapper::toDomain);
    }

    @Override
    public Optional<User> findById(Long id) {
        return springDataUserRepository.findById(id).map(userMapper::toDomain);
    }
}