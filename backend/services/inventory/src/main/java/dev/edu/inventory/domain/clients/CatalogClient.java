package dev.edu.inventory.domain.clients;

import org.springframework.http.ResponseEntity;
import org.springframework.web.service.annotation.HttpExchange;

import dev.edu.inventory.domain.clients.payloads.ProductStats;

public interface CatalogClient {
    @HttpExchange(method = "GET", url = "/products/{productId}/stats")
    public ResponseEntity<ProductStats> getProductStatsById(Long productId);
}
