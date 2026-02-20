package com.gabrieudev.rateio.infrastructure.web.controller;

import com.gabrieudev.rateio.application.dto.UserResponse;
import com.gabrieudev.rateio.application.mapper.UserMapper;
import com.gabrieudev.rateio.application.usecase.GetCurrentUserUseCase;
import com.gabrieudev.rateio.domain.model.User;
import com.gabrieudev.rateio.infrastructure.security.CurrentUser;
import com.gabrieudev.rateio.infrastructure.security.UserPrincipal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Usuário", description = "Endpoints relacionados ao usuário autenticado")
public class UserController {

    private final GetCurrentUserUseCase getCurrentUserUseCase;
    private final UserMapper userMapper;

    public UserController(GetCurrentUserUseCase getCurrentUserUseCase, UserMapper userMapper) {
        this.getCurrentUserUseCase = getCurrentUserUseCase;
        this.userMapper = userMapper;
    }

    @Operation(summary = "Buscar usuário autenticado", description = "Retorna os dados do usuário atualmente autenticado no sistema", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Não autenticado"),
            @ApiResponse(responseCode = "403", description = "Sem permissão de acesso")
    })
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserResponse getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = getCurrentUserUseCase.execute(userPrincipal.getId());
        return userMapper.toResponse(user);
    }
}