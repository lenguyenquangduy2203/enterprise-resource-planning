package dev.edu.gateway.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;

import dev.edu.gateway.application.impl.GatewayJwtAuthenticationConverter;

@Configuration
@EnableWebFluxSecurity
public class ResourceServerConfig {
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(
            ServerHttpSecurity http,
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
                    "/hr/actuator/health"
                ).permitAll()
                .pathMatchers(HttpMethod.GET, "/hr/employees/**").hasAuthority("SCOPE_employee.read")
                .pathMatchers(HttpMethod.POST, "/hr/employees/**").hasAuthority("SCOPE_employee.write")
                .anyExchange().authenticated()
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
