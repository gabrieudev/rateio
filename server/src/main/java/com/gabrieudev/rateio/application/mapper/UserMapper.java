package com.gabrieudev.rateio.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.gabrieudev.rateio.application.dto.UserResponse;
import com.gabrieudev.rateio.domain.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);

    @Mapping(target = "password", ignore = true)
    User toDomain(UserResponse userResponse);
}
