package dev.edu.catalog.adapters.payloads;

import dev.edu.catalog.domain.values.ProductStatus;

public record ProductStats(
    Long id,
    String sku,
    String name,
    ProductStatus status
) {}
