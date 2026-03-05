package dev.edu.inventory.domain.clients;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.HttpExchange;

import dev.edu.inventory.domain.clients.payloads.ProductStats;

public interface CatalogClient {
    @HttpExchange(method = "GET", url = "/stats/products/{productId}")
    public ResponseEntity<ProductStats> getProductStatsById(@PathVariable Long productId);
}
