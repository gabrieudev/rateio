package com.gabrieudev.rateio.infrastructure.adapter.inbound.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gabrieudev.rateio.core.domain.AuthResponse;
import com.gabrieudev.rateio.core.domain.User;
import com.gabrieudev.rateio.core.port.incoming.AuthenticationUseCase;
import com.gabrieudev.rateio.infrastructure.adapter.inbound.web.dto.LoginRequest;
import com.gabrieudev.rateio.infrastructure.adapter.inbound.web.dto.SignUpRequest;
import com.gabrieudev.rateio.infrastructure.mapper.UserMapper;

import jakarta.validation.Valid;

import java.net.URI;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@Tag(name = "Auth", description = "Endpoints de autenticação (login / signup)")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationUseCase authenticationUseCase;
    private final UserMapper userMapper;

    public AuthController(AuthenticationUseCase authenticationUseCase, UserMapper userMapper) {
        this.authenticationUseCase = authenticationUseCase;
        this.userMapper = userMapper;
    }

    @Operation(summary = "Login", description = "Autentica o usuário e retorna um token/objeto de autenticação.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Autenticação bem-sucedida", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida (dados faltando ou malformados)"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authenticationUseCase.authenticate(loginRequest.getEmail(),
                loginRequest.getPassword());
        return ResponseEntity.ok(authResponse);
    }

    @Operation(summary = "Cadastro", description = "Registra um novo usuário. Retorna `201 Created` com Location para /user/me.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados de cadastro inválidos"),
            @ApiResponse(responseCode = "409", description = "Email já cadastrado")
    })
    @PostMapping("/signup")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        User user = authenticationUseCase.registerUser(userMapper.toDomain(signUpRequest));
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
