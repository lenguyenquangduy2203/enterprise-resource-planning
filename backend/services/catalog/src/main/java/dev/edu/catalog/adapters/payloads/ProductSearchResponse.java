package dev.edu.catalog.adapters.payloads;

import java.math.BigDecimal;

import dev.edu.catalog.domain.values.ProductStatus;

public record ProductSearchResponse(
        String sku,
        String name,
        String unit,
        BigDecimal unitPrice,
        String categoryCode,
        String categoryName,
        String manufacturerCode,
        String manufacturerName,
        ProductStatus status
) {}
