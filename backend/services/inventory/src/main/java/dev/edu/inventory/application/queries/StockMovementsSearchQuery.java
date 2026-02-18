package dev.edu.inventory.application.queries;

import java.time.Instant;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.edu.inventory.application.contracts.Query;
import dev.edu.inventory.application.services.StockMovementsSearchQueryHandler;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import dev.edu.inventory.domain.values.MovementStatus;
import dev.edu.inventory.domain.values.MovementType;

public record StockMovementsSearchQuery(
    String productSku,
    MovementType movementType,
    MovementStatus status,
    Long fromWarehouseId,
    Long toWarehouseId,
    UUID performedBy,
    Instant createdFrom,
    Instant createdTo,
    Pageable pageable
) implements Query<StockMovementsSearchQueryHandler, Page<StockMovement>> {
    @Override
    public Page<StockMovement> accept(StockMovementsSearchQueryHandler handler) {
        return handler.handle(this);
    }
}
