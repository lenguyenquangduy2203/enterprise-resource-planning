package dev.edu.catalog.adapters.payloads;

import jakarta.validation.constraints.Size;

public record ProductLookupParams(
    @Size(max = 150)
    String sku
) {}
