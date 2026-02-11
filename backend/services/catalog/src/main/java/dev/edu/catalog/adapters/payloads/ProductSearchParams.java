package dev.edu.catalog.adapters.payloads;

import java.math.BigDecimal;

import dev.edu.catalog.domain.values.ProductStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

public record ProductSearchParams(
    @Size(max = 150)
    String name,
    @Size(max = 50)
    String categoryCode,
    @Size(max = 50)
    String manufacturerCode,
    @DecimalMin(value = "0.0", inclusive = true)
    BigDecimal minPrice,
    @DecimalMin(value = "0.0", inclusive = true)
    BigDecimal maxPrice,
    ProductStatus status
) {}
