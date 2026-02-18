package dev.edu.inventory.application.services;

import dev.edu.inventory.application.commands.movement.AdjustmentStockCommand;
import dev.edu.inventory.application.commands.movement.ExportStockCommand;
import dev.edu.inventory.application.commands.movement.ImportStockCommand;
import dev.edu.inventory.application.commands.movement.TransferStockCommand;
import dev.edu.inventory.application.results.MovementRequestStatus;

public interface CreateStockMovementCommandHandler {
    MovementRequestStatus handle(ImportStockCommand command);
    MovementRequestStatus handle(ExportStockCommand command);
    MovementRequestStatus handle(TransferStockCommand command);
    MovementRequestStatus handle(AdjustmentStockCommand command);
}
