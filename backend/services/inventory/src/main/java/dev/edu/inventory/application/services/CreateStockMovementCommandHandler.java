package dev.edu.inventory.application.services;

import dev.edu.inventory.application.commands.movement.AdjustmentStockCommand;
import dev.edu.inventory.application.commands.movement.ExportStockCommand;
import dev.edu.inventory.application.commands.movement.ImportStockCommand;
import dev.edu.inventory.application.commands.movement.TransferStockCommand;
import dev.edu.inventory.domain.entities.persistence.StockMovement;

public interface CreateStockMovementCommandHandler {
    StockMovement handle(ImportStockCommand command);
    StockMovement handle(ExportStockCommand command);
    StockMovement handle(TransferStockCommand command);
    StockMovement handle(AdjustmentStockCommand command);
}
