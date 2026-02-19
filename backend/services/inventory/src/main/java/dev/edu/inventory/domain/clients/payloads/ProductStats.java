package dev.edu.inventory.domain.clients.payloads;

import dev.edu.inventory.domain.values.ProductStatus;

public record ProductStats(
    Long id,
    String sku,
    String name,
    ProductStatus status
) {}
