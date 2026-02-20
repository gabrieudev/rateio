package com.gabrieudev.rateio.infrastructure.web.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gabrieudev.rateio.application.dto.ApiResponse;
import com.gabrieudev.rateio.application.dto.AuthResponse;
import com.gabrieudev.rateio.application.dto.LoginRequest;
import com.gabrieudev.rateio.application.dto.SignUpRequest;
import com.gabrieudev.rateio.application.usecase.LoginUseCase;
import com.gabrieudev.rateio.application.usecase.SignUpUseCase;
import com.gabrieudev.rateio.domain.model.User;
import com.gabrieudev.rateio.infrastructure.security.TokenProvider;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.net.URI;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Endpoints de autenticação e registro de usuários")
public class AuthController {

    private final SignUpUseCase signUpUseCase;
    private final LoginUseCase loginUseCase;
    private final TokenProvider tokenProvider;

    public AuthController(SignUpUseCase signUpUseCase, LoginUseCase loginUseCase, TokenProvider tokenProvider) {
        this.signUpUseCase = signUpUseCase;
        this.loginUseCase = loginUseCase;
        this.tokenProvider = tokenProvider;
    }

    @Operation(summary = "Autenticar usuário", description = "Realiza autenticação do usuário e retorna um token JWT")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Autenticação realizada com sucesso"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Credenciais inválidas"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Requisição inválida")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        User user = loginUseCase.execute(loginRequest);
        String token = tokenProvider.createToken(user);
        return ResponseEntity.ok(new AuthResponse(token, "Bearer"));
    }

    @Operation(summary = "Registrar novo usuário", description = "Cria um novo usuário no sistema")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Usuário registrado com sucesso"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        User user = signUpUseCase.execute(signUpRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully"));
    }
}