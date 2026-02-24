package dev.edu.gateway.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;

import dev.edu.gateway.application.impl.DynamicPermissionAuthorizationManager;
import dev.edu.gateway.application.impl.GatewayJwtAuthenticationConverter;

@Configuration
@EnableWebFluxSecurity
public class ResourceServerConfig {
    @Bean
    SecurityWebFilterChain securityWebFilterChain(
            ServerHttpSecurity http,
            DynamicPermissionAuthorizationManager authManager,
            GatewayJwtAuthenticationConverter customConverter
    ) {
        return http
            .cors(Customizer.withDefaults())
            .csrf(ServerHttpSecurity.CsrfSpec::disable)
            .authorizeExchange(ex -> ex
                .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .pathMatchers("/me/permissions").authenticated()
                .pathMatchers(
                    "/actuator/health", 
                    "/actuator/refresh", 
                    "/hr/actuator/health",
                    "/auth/actuator/health"
                ).permitAll()
                .pathMatchers(HttpMethod.POST, "/auth/api/accounts/**").hasAuthority("SCOPE_account.write")
                .anyExchange().access(authManager)
            )
            .oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwt ->
                    jwt.jwtAuthenticationConverter(
                        new ReactiveJwtAuthenticationConverterAdapter(customConverter)
                    )
                )
            )
            .build();
    }
}
