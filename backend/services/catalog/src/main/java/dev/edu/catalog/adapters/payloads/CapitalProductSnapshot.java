package dev.edu.catalog.adapters.payloads;

import java.math.BigDecimal;

public record CapitalProductSnapshot(
    Long id,
    BigDecimal unitPrice,
    String categoryCode
) {}
