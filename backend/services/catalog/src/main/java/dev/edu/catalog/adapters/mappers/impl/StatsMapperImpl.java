package dev.edu.catalog.adapters.mappers.impl;

import org.springframework.stereotype.Component;

import dev.edu.catalog.adapters.mappers.StatsMapper;
import dev.edu.catalog.adapters.payloads.ProductStats;
import dev.edu.catalog.domain.entities.persistence.Product;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class StatsMapperImpl implements StatsMapper {
    @Override
    public ProductStats toProductStats(Product product) {
        return new ProductStats(
            product.getId(),
            product.getSku(),
            product.getName(),
            product.getStatus()
        );
    }
}
