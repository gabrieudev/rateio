package com.gabrieudev.rateio.infrastructure.mapper;

import org.mapstruct.Mapper;

import com.gabrieudev.rateio.core.domain.SignUpRequest;
import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence.entity.SpringUserModel;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toDomain(SpringUserModel springUserModel);

    SpringUserModel toEntity(User user);

    SignUpRequest toDomain(com.gabrieudev.rateio.infrastructure.adapter.inbound.web.dto.SignUpRequest signUpRequest);
}
