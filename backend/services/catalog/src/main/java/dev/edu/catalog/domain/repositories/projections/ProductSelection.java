package dev.edu.catalog.domain.repositories.projections;

public record ProductSelection(
    Long id,
    String sku,
    String name
) {}
