package dev.edu.configurer.configs;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DiscoverConfigWatcher {
    @Value("${spring.application.name}")
    private String currentApplicationName;

    private DiscoveryClient discoveryClient;

    private final RestTemplate restTemplate = new RestTemplate();

    private final Logger log = LoggerFactory.getLogger(DiscoverConfigWatcher.class);

    public DiscoverConfigWatcher(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void notifyAllServices() {
        // Get names of all services registered in Eureka
        List<String> services = discoveryClient.getServices();

        for (String serviceId : services) {
            // Config Server shouldn't refresh itself in this loop
            if (serviceId.equalsIgnoreCase(this.currentApplicationName)) continue;

            List<ServiceInstance> instances = discoveryClient.getInstances(serviceId);
            for (ServiceInstance instance : instances) {
                try {
                    String url = instance.getUri().toString() + "/actuator/refresh";
                    
                    // 1. Fix 415: Set Content-Type to JSON
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    
                    // 2. Fix 401: If your services are protected by Basic Auth/Internal Token
                    // headers.setBasicAuth("admin", "password"); 
                    
                    HttpEntity<String> entity = new HttpEntity<>("{}", headers);

                    restTemplate.postForEntity(url, entity, String.class);
                    log.info("Successfully refreshed {} at {}", serviceId, url);
                    
                } catch (Exception e) {
                    log.error("Failed to refresh {}: {}", serviceId, e.getMessage());
                }
            }
        }
    }
}
