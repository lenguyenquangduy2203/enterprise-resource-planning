package dev.edu.gateway.application.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;

import dev.edu.gateway.configs.props.PolicyOverlayProperties;

@Service
@RefreshScope
public class RolePolicyRegistry {
    private final Map<String, Set<String>> effectiveRolePermissions;

    public RolePolicyRegistry(PolicyOverlayProperties properties) {
        Map<String, Set<String>> flattened = new HashMap<>();
        Map<String, List<String>> flatRoles = properties.getRolePermissions();
        Map<String, List<String>> roleUseCases = properties.getRoleUseCases();
        Map<String, List<String>> useCasePermissions = properties.getUseCasePermissions();
        Set<String> allRoles = new HashSet<>();

        allRoles.addAll(flatRoles.keySet());
        allRoles.addAll(roleUseCases.keySet());
        for (String role : allRoles) {
            Set<String> permissions = new HashSet<>();
            // Direct permissions
            permissions.addAll(flatRoles.getOrDefault(role, List.of()));
            // UseCase-derived permissions
            for (String useCase : roleUseCases.getOrDefault(role, List.of())) {
                permissions.addAll(
                    useCasePermissions.getOrDefault(useCase, List.of())
                );
            }

            flattened.put(role.toUpperCase(), Set.copyOf(permissions));
        }

        this.effectiveRolePermissions = Map.copyOf(flattened);
    }

    public Set<String> getPermissions(String role) {
        return effectiveRolePermissions.getOrDefault(role.toUpperCase(), Set.of());
    }
}
