package dev.edu.gateway.application.impl;

import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.ReactiveAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;

@Component
public class DynamicPermissionAuthorizationManager implements ReactiveAuthorizationManager<AuthorizationContext> {
    @Override
    public Mono<AuthorizationDecision> check(Mono<Authentication> authenticationMono, AuthorizationContext context) {
        ServerHttpRequest request = context.getExchange().getRequest();
        HttpMethod method = request.getMethod();
        String path = request.getPath()
                .pathWithinApplication()
                .value();
        String action = mapMethodToAction(method);
        String resource = extractResource(path);

        if (action == null || resource == null) {
            return Mono.just(new AuthorizationDecision(false));
        }

        String requiredAuthority = "SCOPE_" + resource + "." + action;

        return authenticationMono
                .map(Authentication::getAuthorities)
                .map(authorities ->
                        authorities.stream()
                                .anyMatch(a -> a.getAuthority().equals(requiredAuthority))
                )
                .map(AuthorizationDecision::new)
                .defaultIfEmpty(new AuthorizationDecision(false));
    }

    private String mapMethodToAction(HttpMethod method) {
        if (method == null) {
            return null;
        } else if (HttpMethod.GET.equals(method)) {
            return "read";
        } else if (
            HttpMethod.POST.equals(method) ||
            HttpMethod.PUT.equals(method) ||
            HttpMethod.PATCH.equals(method) ||
            HttpMethod.DELETE.equals(method)) {
            return "write";
        } else {
            return null;
        }
    }

    private String extractResource(String path) {
        if (path == null || path.isBlank()) return null;

        String[] segments = path.split("/");

        if (segments.length < 3) return null;

        return segments[2]; // plural resource
    }
}
