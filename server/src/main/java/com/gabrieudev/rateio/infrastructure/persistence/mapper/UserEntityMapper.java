package com.gabrieudev.rateio.infrastructure.persistence.mapper;

import org.mapstruct.Mapper;

import com.gabrieudev.rateio.domain.model.User;
import com.gabrieudev.rateio.infrastructure.persistence.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserEntityMapper {
    UserEntity toEntity(User user);

    User toDomain(UserEntity entity);
}