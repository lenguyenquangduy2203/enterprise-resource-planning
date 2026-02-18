package dev.edu.inventory.adapters.mappers;

import dev.edu.inventory.adapters.payloads.snapshots.EmployeeSnapshot;
import dev.edu.inventory.adapters.payloads.snapshots.ProductSnapshot;
import dev.edu.inventory.adapters.payloads.snapshots.WarehouseSnapshot;
import dev.edu.inventory.domain.entities.persistence.StockMovement;

public interface SnapshotsMapper {
    ProductSnapshot toProductSnapshot(StockMovement movement);
    WarehouseSnapshot toFromWarehouseSnapshot(StockMovement movement);
    WarehouseSnapshot toToWarehouseSnapshot(StockMovement movement);
    EmployeeSnapshot toPerformedBySnapshot(StockMovement movement);
    EmployeeSnapshot toReviewedBySnapshot(StockMovement movement);
}
