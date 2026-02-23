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
    SecurityWebFilterChain securityWebFilterChain(
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
                    "/hr/actuator/health",
                    "/auth/actuator/health"
                ).permitAll()
                .pathMatchers(HttpMethod.GET, 
                    "/hr/employees/*", "/hr/employees/*/**")
                    .hasAnyAuthority("SCOPE_employee.read", "SCOPE_employee.read_own")
                .pathMatchers(HttpMethod.GET, "/hr/employees/**").hasAuthority("SCOPE_employee.read")
                .pathMatchers(HttpMethod.POST, "/hr/employees/**").hasAuthority("SCOPE_employee.write")
                .pathMatchers(HttpMethod.GET, "/hr/departments/**").hasAuthority("SCOPE_department.read")

                .pathMatchers(HttpMethod.GET, "/catalog/products/**").hasAnyAuthority("SCOPE_product.read")
                .pathMatchers(HttpMethod.POST, "/catalog/products/**").hasAnyAuthority("SCOPE_product.write")
                .pathMatchers(HttpMethod.GET, "/catalog/categories/**").hasAnyAuthority("SCOPE_category.read")
                .pathMatchers(HttpMethod.GET, "/catalog/manufacturers/**").hasAnyAuthority("SCOPE_manufacturer.read")
                
                .pathMatchers(HttpMethod.POST, "/auth/api/accounts/**").hasAuthority("SCOPE_account.write")
                
                .pathMatchers(HttpMethod.GET, "/inv/stock-movements/**").hasAnyAuthority("SCOPE_stock_movement.read")
                .pathMatchers(HttpMethod.POST, "/inv/stock-movements/**").hasAnyAuthority("SCOPE_stock_movement.write")
                .pathMatchers(HttpMethod.GET, "/inv/warehouses/**").hasAnyAuthority("SCOPE_warehouse.read")
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
