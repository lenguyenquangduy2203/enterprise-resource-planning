package dev.edu.analysis.domain.clients.payloads.movement;

import java.util.Set;

import jakarta.validation.constraints.NotNull;

public record MovementStatistics(
    @NotNull Set<MovementTypeCount> typeDistributions,
    @NotNull Set<MovementStatusCount> statusDistributions,
    @NotNull Set<WarehouseCount> warehouseDistributions
) {}
