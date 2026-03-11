package dev.edu.inventory.adapters.payloads;

public record CapitalStock(
    Long id,
    Long productId,
    Integer quantity,
    String warehouseCode
) {}
