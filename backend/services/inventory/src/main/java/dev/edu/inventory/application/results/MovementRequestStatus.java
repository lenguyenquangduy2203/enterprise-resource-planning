package dev.edu.inventory.application.results;

import dev.edu.inventory.domain.values.MovementStatus;

public record MovementRequestStatus(
    Long movementRequestId,
    MovementStatus status
) {}
