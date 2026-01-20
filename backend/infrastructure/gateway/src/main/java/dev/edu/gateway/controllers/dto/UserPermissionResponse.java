package dev.edu.gateway.controllers.dto;

import java.util.List;

public record UserPermissionResponse(
    String username,
    List<String> roles,
    List<String> permissions
) {}
