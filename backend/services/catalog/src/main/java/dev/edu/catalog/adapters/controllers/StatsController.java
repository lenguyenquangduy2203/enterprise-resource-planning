package dev.edu.catalog.adapters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.catalog.adapters.mappers.StatsMapper;
import dev.edu.catalog.adapters.payloads.ProductStats;
import dev.edu.catalog.application.services.SimpleProductService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/stats")
public class StatsController {
    private final SimpleProductService productService;
    private final StatsMapper statsMapper;

    @GetMapping("/products/{productId}")
    public ResponseEntity<ProductStats> getStats(@PathVariable Long productId) {
        var product = productService.getProductById(productId);
        var stats = statsMapper.toProductStats(product);

        return ResponseEntity.ok(stats);
    }
}
