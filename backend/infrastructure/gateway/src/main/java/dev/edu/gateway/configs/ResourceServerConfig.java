package dev.edu.gateway.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class ResourceServerConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
            // Apply security to all auth endpoints
            .securityMatcher("/auth/**")
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/auth/login", "/auth/refresh", "/auth/actuator/health").permitAll()
                // Protected endpoints
                .requestMatchers("/auth/accounts/**").hasAuthority("ROLE_ADMIN") 
                // Later will use mapped permissions instead of roles
                // Everything else under /auth must be authenticated
                .anyRequest().authenticated()
            )
            // Resource Server (JWT)
            .oauth2ResourceServer(oauth2 ->
                oauth2.jwt(Customizer.withDefaults())
            );

        return http.build();
    }
}
