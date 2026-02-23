package dev.edu.gateway.application.impl;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import dev.edu.gateway.application.RolePermissionResolver;
import dev.edu.gateway.configs.props.PolicyOverlayProperties;

@Deprecated
public class FlatRolePermissionResolver implements RolePermissionResolver {
    private final PolicyOverlayProperties properties;

    public FlatRolePermissionResolver(PolicyOverlayProperties properties) {
        this.properties = properties;
    }

    @Override
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
