package dev.edu.gateway.configs.props;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.security.policy-overlay")
public class PolicyOverlayProperties {
    /**
     * Old flat model: ROLE -> resource.action
     * (Keep for backward compatibility)
     */
    private Map<String, List<String>> rolePermissions = new HashMap<>();

    /**
     * New model: UseCase -> resource.action
     */
    private Map<String, List<String>> useCasePermissions = new HashMap<>();

    /**
     * New model: ROLE -> UseCase
     */
    private Map<String, List<String>> roleUseCases = new HashMap<>();

    public Map<String, List<String>> getRolePermissions() {
        return rolePermissions;
    }

    public void setRolePermissions(Map<String, List<String>> rolePermissions) {
        this.rolePermissions = rolePermissions;
    }

    public Map<String, List<String>> getUseCasePermissions() {
        return useCasePermissions;
    }

    public void setUseCasePermissions(Map<String, List<String>> useCasePermissions) {
        this.useCasePermissions = useCasePermissions;
    }

    public Map<String, List<String>> getRoleUseCases() {
        return roleUseCases;
    }

    public void setRoleUseCases(Map<String, List<String>> roleUseCases) {
        this.roleUseCases = roleUseCases;
    }
}
