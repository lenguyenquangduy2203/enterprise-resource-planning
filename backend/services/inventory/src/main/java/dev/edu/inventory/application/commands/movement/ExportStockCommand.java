package dev.edu.inventory.application.commands.movement;

import dev.edu.inventory.application.results.MovementRequestStatus;
import dev.edu.inventory.application.services.CreateStockMovementCommandHandler;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public final record ExportStockCommand(
    @NotNull Long productId,
    @NotNull @Positive Integer quantity,
    @NotNull Long fromWarehouseId
) implements MovementRequest {
    @Override
    public MovementRequestStatus accept(CreateStockMovementCommandHandler handler) {
        return handler.handle(this);
    }
}
