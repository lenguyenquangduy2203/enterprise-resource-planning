package dev.edu.gateway.application.impl;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import dev.edu.gateway.configs.props.PolicyOverlayProperties;

@Component
public class RolePermissionResolver {
    private final PolicyOverlayProperties properties;

    public RolePermissionResolver(PolicyOverlayProperties properties) {
        this.properties = properties;
    }

    public Set<GrantedAuthority> resolve(Collection<String> roles) {
        if (roles == null || roles.isEmpty()) {
            return Set.of();
        }

        return roles.stream()
            .map(String::toUpperCase)
            .map(role -> properties.getRolePermissions().getOrDefault(role, List.of()))
            .flatMap(Collection::stream)
            .distinct()
            .map(p -> new SimpleGrantedAuthority("SCOPE_" + p))
            .collect(Collectors.toUnmodifiableSet());
    }
}
