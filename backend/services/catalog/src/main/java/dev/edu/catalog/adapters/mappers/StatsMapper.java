package dev.edu.catalog.adapters.mappers;

import dev.edu.catalog.adapters.payloads.ProductStats;
import dev.edu.catalog.domain.entities.persistence.Product;

public interface StatsMapper {
    ProductStats toProductStats(Product product);
}
