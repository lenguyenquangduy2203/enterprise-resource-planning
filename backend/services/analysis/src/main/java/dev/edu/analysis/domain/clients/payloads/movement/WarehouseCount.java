package dev.edu.analysis.domain.clients.payloads.movement;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record WarehouseCount(
    @NotNull @Positive Long warehouseId,
    @NotNull @Positive Long totalMovements
) {}
