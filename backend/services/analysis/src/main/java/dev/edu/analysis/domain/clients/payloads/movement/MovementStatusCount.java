package dev.edu.analysis.domain.clients.payloads.movement;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MovementStatusCount(
    @NotNull MovementStatus status,
    @NotNull @Positive Long totalMovements
) {}
