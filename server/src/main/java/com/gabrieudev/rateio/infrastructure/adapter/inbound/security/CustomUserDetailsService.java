package com.gabrieudev.rateio.infrastructure.adapter.inbound.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.exceptions.ResourceNotFoundException;
import com.gabrieudev.rateio.core.port.outgoing.UserRepositoryPort;
import com.gabrieudev.rateio.infrastructure.mapper.UserMapper;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepositoryPort userRepository;
    private final UserMapper userMapper;

    public CustomUserDetailsService(UserRepositoryPort userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));
        return UserPrincipal.create(userMapper.toEntity(user));
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));
        return UserPrincipal.create(userMapper.toEntity(user));
    }
}