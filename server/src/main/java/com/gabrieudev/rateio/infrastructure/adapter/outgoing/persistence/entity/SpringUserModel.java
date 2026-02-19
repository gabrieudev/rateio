package com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence.entity;

import com.gabrieudev.rateio.core.domain.enums.AuthProvider;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class SpringUserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = true)
    private Boolean emailVerified = false;

    @Column(nullable = true)
    private String password;

    @Column(nullable = true)
    private AuthProvider provider;

    @Column(nullable = true)
    private String providerId;
}
