package dev.edu.gateway.controllers;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.gateway.controllers.dto.UserPermissionResponse;

@RestController
public class MeController {
    @CrossOrigin(
        origins = "http://0.0.0.0:5173",
        allowCredentials = "true"
    )
    @GetMapping("/me/permissions")
    public UserPermissionResponse myPermissions(Authentication authentication) {

        JwtAuthenticationToken jwtAuth =
                (JwtAuthenticationToken) authentication;

        String username = jwtAuth.getName();

        List<String> roles =
                jwtAuth.getToken().getClaimAsStringList("roles");

        List<String> permissions = jwtAuth.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .filter(a -> a.startsWith("SCOPE_"))
                .map(a -> a.substring("SCOPE_".length()))
                .sorted()
                .toList();

        return new UserPermissionResponse(
                username,
                roles,
                permissions
        );
    }
}
