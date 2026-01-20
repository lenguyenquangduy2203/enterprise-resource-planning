package dev.edu.gateway.configs.props;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.security.policy-overlay")
public class PolicyOverlayProperties {
    private Map<String, List<String>> rolePermissions = new HashMap<>();

    public Map<String, List<String>> getRolePermissions() {
        return rolePermissions;
    }

    public void setRolePermissions(Map<String, List<String>> rolePermissions) {
        this.rolePermissions = rolePermissions;
    }
}
