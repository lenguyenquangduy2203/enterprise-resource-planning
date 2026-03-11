package dev.edu.analysis.domain.clients.payloads.movement;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MovementTypeCount(
    @NotNull MovementType type,
    @NotNull @Positive Long totalMovements
) {}
