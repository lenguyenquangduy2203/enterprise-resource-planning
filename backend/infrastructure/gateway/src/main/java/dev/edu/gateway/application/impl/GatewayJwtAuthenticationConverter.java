package dev.edu.gateway.application.impl;

import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import dev.edu.gateway.application.RolePermissionResolver;


@Component
public class GatewayJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    private final RolePermissionResolver resolver;

    public GatewayJwtAuthenticationConverter(RolePermissionResolver resolver) {
        this.resolver = resolver;
    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        List<String> roles = jwt.getClaimAsStringList("roles");
        var authorities = resolver.resolve(roles);
        return new JwtAuthenticationToken(jwt, authorities);
    }

}
