package dev.edu.inventory.adapters.payloads.snapshots;

public record ProductSnapshot(
    Long id,
    String sku,
    String name
) {}
