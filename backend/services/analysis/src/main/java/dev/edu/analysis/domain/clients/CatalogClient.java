package dev.edu.analysis.domain.clients;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

import dev.edu.analysis.domain.clients.payloads.capital.Product;

public interface CatalogClient {
    @GetExchange("/capital/products")
    ResponseEntity<Set<Product>> findProductsIn(@RequestParam("ids") Set<Long> productIds);
}
