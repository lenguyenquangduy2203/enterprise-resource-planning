package dev.edu.hr.domain.clients;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class HttpClientConfig {
    @Bean
    AuthClient hrClient(RestClient.Builder builder) {
        var client = builder
            .baseUrl("http://gateway:8080")
            .requestInterceptor((request, body, execution) -> {
                var auth = SecurityContextHolder.getContext().getAuthentication();
                if (auth instanceof JwtAuthenticationToken jwtAuth) {
                    request.getHeaders().setBearerAuth(jwtAuth.getToken().getTokenValue());
                }

                return execution.execute(request, body);
            })
            .build();
        
        var factory = HttpServiceProxyFactory
            .builderFor(RestClientAdapter.create(client))
            .build();

        return factory.createClient(AuthClient.class);
    }
}
