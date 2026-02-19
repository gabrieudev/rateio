package com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence.entity.SpringUserModel;

import java.util.Optional;

@Repository
public interface SpringDataUserRepository extends JpaRepository<SpringUserModel, Long> {
    Optional<SpringUserModel> findByEmail(String email);

    Boolean existsByEmail(String email);
}