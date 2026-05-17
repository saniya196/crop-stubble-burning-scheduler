package com.stubblesched.auth.model;

public class AuthEmailCheckResponse {
    private boolean exists;
    private String message;

    public AuthEmailCheckResponse() {
    }

    public AuthEmailCheckResponse(boolean exists, String message) {
        this.exists = exists;
        this.message = message;
    }

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}