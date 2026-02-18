package dev.edu.inventory.adapters.payloads;

import java.time.Instant;

import dev.edu.inventory.adapters.payloads.snapshots.EmployeeSnapshot;
import dev.edu.inventory.adapters.payloads.snapshots.ProductSnapshot;
import dev.edu.inventory.adapters.payloads.snapshots.WarehouseSnapshot;
import dev.edu.inventory.domain.values.MovementStatus;
import dev.edu.inventory.domain.values.MovementType;

public record StockMovementResponse(
    Long id,
    ProductSnapshot product,
    MovementType movementType,
    MovementStatus status,
    Integer quantity,
    WarehouseSnapshot fromWarehouse,
    WarehouseSnapshot toWarehouse,
    EmployeeSnapshot performedBy,
    EmployeeSnapshot reviewedBy,
    Instant createdAt,
    Instant updatedAt
) {}
