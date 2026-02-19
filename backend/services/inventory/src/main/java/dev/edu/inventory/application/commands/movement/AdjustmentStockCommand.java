package dev.edu.inventory.application.commands.movement;

import dev.edu.inventory.application.services.CreateStockMovementCommandHandler;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;

public final record AdjustmentStockCommand(
    @NotNull Long productId,
    @NotNull @Positive Integer quantity,
    @NotNull Long warehouseId
) implements MovementRequest {
    @Override
    public StockMovement accept(CreateStockMovementCommandHandler handler) {
        return handler.handle(this);
    }
}
