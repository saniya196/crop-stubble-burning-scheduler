package com.stubblesched.auth.controller;

import com.stubblesched.auth.model.AuthEmailCheckResponse;
import com.stubblesched.auth.model.AuthRequest;
import com.stubblesched.auth.model.AuthResponse;
import com.stubblesched.auth.service.AuthService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/email-check")
    public AuthEmailCheckResponse checkEmail(
            @RequestParam @NotBlank(message = "Email is required") @Email(message = "Please enter a valid email address") String email
    ) {
        return authService.checkEmail(email);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @PostMapping("/signup")
    public AuthResponse signup(@Valid @RequestBody AuthRequest request) {
        return authService.signup(request);
    }
}