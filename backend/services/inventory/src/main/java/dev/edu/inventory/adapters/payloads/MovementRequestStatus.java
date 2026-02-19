package dev.edu.inventory.adapters.payloads;

import dev.edu.inventory.domain.values.MovementStatus;

public record MovementRequestStatus(
    Long movementRequestId,
    MovementStatus status
) {}
