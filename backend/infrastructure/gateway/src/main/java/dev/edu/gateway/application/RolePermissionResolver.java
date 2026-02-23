package dev.edu.gateway.application;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

public interface RolePermissionResolver {
    Set<GrantedAuthority> resolve(Collection<String> roles);
}
