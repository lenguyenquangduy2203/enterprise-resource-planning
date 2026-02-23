package dev.edu.gateway.application.impl;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import dev.edu.gateway.application.RolePermissionResolver;

@Service
public class MergedRolePermissionResolver implements RolePermissionResolver {
    private final RolePolicyRegistry registry;

    public MergedRolePermissionResolver(RolePolicyRegistry registry) {
        this.registry = registry;
    }

    @Override
    public Set<GrantedAuthority> resolve(Collection<String> roles) {

        if (roles == null || roles.isEmpty()) {
            return Set.of();
        }

        return roles.stream()
            .map(String::toUpperCase)
            .map(registry::getPermissions)
            .flatMap(Set::stream)
            .distinct()
            .map(p -> new SimpleGrantedAuthority("SCOPE_" + p))
            .collect(Collectors.toUnmodifiableSet());
    }
}
