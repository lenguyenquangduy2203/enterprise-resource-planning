package dev.edu.auth.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;

import dev.edu.auth.domain.models.Role;
import dev.edu.auth.infrastructure.persistence.jpa.AccountRepository;

@Configuration
public class JwtConfig {
    @Bean
    OAuth2TokenCustomizer<JwtEncodingContext> jwtCustomizer(AccountRepository accountRepository) {
        return context -> {
            if (OAuth2TokenType.ACCESS_TOKEN.equals(context.getTokenType())) {
                String username = context.getPrincipal().getName();
                var account = accountRepository.findByUsername(username)
                    .orElseThrow();
                context.getClaims().claim("accountId", account.getId());
                if (account.getEmployeeId() != null) {
                    context.getClaims().claim("employeeId", account.getEmployeeId());
                }

                context.getClaims().claim(
                    "roles",
                    account.getRoles().stream()
                        .map(Role::getCode)
                        .toList()
                );
            }
        };
    }
}
