package dev.edu.analysis.domain.clients.payloads.movement;

import java.util.Map;

import jakarta.validation.constraints.NotNull;

public record MovementStatistics(
    @NotNull Map<MovementType, Integer> typeCount,
    @NotNull Map<MovementStatus, Integer> statusCount,
    @NotNull Map<String, Integer> warehouseCount
) {}
