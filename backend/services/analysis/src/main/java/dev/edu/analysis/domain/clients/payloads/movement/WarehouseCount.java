package dev.edu.analysis.domain.clients.payloads.movement;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record WarehouseCount(
    @NotNull @NotEmpty String warehouseCode,
    @NotNull @Positive Integer totalMovements
) {}
