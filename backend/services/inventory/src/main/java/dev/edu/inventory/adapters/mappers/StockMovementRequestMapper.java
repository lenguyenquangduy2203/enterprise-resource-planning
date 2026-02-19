package dev.edu.inventory.adapters.mappers;

import dev.edu.inventory.adapters.payloads.MovementRequestStatus;
import dev.edu.inventory.domain.entities.persistence.StockMovement;

public interface StockMovementRequestMapper {
    MovementRequestStatus toMovementRequestStatus(StockMovement movement);
}
