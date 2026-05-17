package com.stubblesched.auth.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stubblesched.auth.model.AuthEmailCheckResponse;
import com.stubblesched.auth.model.AuthRequest;
import com.stubblesched.auth.model.AuthResponse;
import com.stubblesched.auth.model.UserProfile;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class AuthService {
    private static final String DEMO_EMAIL = "farmer@example.com";
    private static final String DEMO_PASSWORD = "password123";
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Path storagePath = Path.of(System.getProperty("user.dir"), "data", "registered-users.json");

    public synchronized AuthEmailCheckResponse checkEmail(String email) {
        String normalizedEmail = normalizeEmail(email);
        if (normalizedEmail.isEmpty()) {
            return new AuthEmailCheckResponse(false, "Email is required");
        }

        boolean exists = findUser(normalizedEmail) != null;
        return new AuthEmailCheckResponse(exists, exists ? "Email already registered" : "Email is available");
    }

    public synchronized AuthResponse login(AuthRequest request) {
        String normalizedEmail = normalizeEmail(request.getEmail());
        if (normalizedEmail.isEmpty() || request.getPassword() == null || request.getPassword().isBlank()) {
            return new AuthResponse(false, "Email and password are required", null);
        }

        UserRecord user = findUser(normalizedEmail);
        if (user == null) {
            return new AuthResponse(false, "Email not found", null);
        }

        if (!Objects.equals(user.password(), request.getPassword())) {
            return new AuthResponse(false, "Incorrect password", null);
        }

        return new AuthResponse(true, "Login successful", toProfile(user));
    }

    public synchronized AuthResponse signup(AuthRequest request) {
        String normalizedEmail = normalizeEmail(request.getEmail());
        if (normalizedEmail.isEmpty() || request.getPassword() == null || request.getPassword().isBlank()) {
            return new AuthResponse(false, "Email and password are required", null);
        }

        if (findUser(normalizedEmail) != null) {
            return new AuthResponse(false, "Email already registered", null);
        }

        String displayName = request.getName();
        if (displayName == null || displayName.isBlank()) {
            displayName = normalizedEmail.substring(0, normalizedEmail.indexOf('@'));
        }

        UserRecord newUser = new UserRecord(UUID.randomUUID().toString(), normalizedEmail, displayName.trim(), request.getPassword());
        List<UserRecord> users = loadUsers();
        users.add(newUser);
        saveUsers(users);

        return new AuthResponse(true, "Signup successful", toProfile(newUser));
    }

    private UserProfile toProfile(UserRecord user) {
        return new UserProfile(user.id(), user.email(), user.name());
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

    private UserRecord findUser(String email) {
        return loadUsers().stream()
                .filter(user -> user.email().equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
    }

    private List<UserRecord> loadUsers() {
        ensureSeedData();
        try {
            if (!Files.exists(storagePath)) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(storagePath.toFile(), new TypeReference<>() {
            });
        } catch (IOException e) {
            throw new IllegalStateException("Unable to load auth users", e);
        }
    }

    private void saveUsers(List<UserRecord> users) {
        try {
            Files.createDirectories(storagePath.getParent());
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(storagePath.toFile(), users);
        } catch (IOException e) {
            throw new IllegalStateException("Unable to save auth users", e);
        }
    }

    private void ensureSeedData() {
        if (Files.exists(storagePath)) {
            return;
        }

        try {
            Files.createDirectories(storagePath.getParent());
            List<UserRecord> seedUsers = List.of(
                    new UserRecord(UUID.randomUUID().toString(), DEMO_EMAIL, "farmer", DEMO_PASSWORD)
            );
            Files.writeString(
                    storagePath,
                    objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(seedUsers),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING
            );
        } catch (IOException e) {
            throw new IllegalStateException("Unable to initialize auth users", e);
        }
    }

    private record UserRecord(String id, String email, String name, String password) {
    }
}