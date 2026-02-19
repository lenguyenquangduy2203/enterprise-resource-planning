package dev.edu.inventory.adapters.mappers.impl;

import org.springframework.stereotype.Component;

import dev.edu.inventory.adapters.mappers.SnapshotsMapper;
import dev.edu.inventory.adapters.payloads.snapshots.EmployeeSnapshot;
import dev.edu.inventory.adapters.payloads.snapshots.ProductSnapshot;
import dev.edu.inventory.adapters.payloads.snapshots.WarehouseSnapshot;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SnapshotsMapperImpl implements SnapshotsMapper {
    @Override
    public ProductSnapshot toProductSnapshot(StockMovement movement) {
        return new ProductSnapshot(
            movement.getProductId(), 
            movement.getProductSku(),
            movement.getProductName()
        );
    }

    @Override
    public WarehouseSnapshot toFromWarehouseSnapshot(StockMovement movement) {
        return new WarehouseSnapshot(
            movement.getFromWarehouseId(),
            movement.getFromWarehouseName()
        );
    }

    @Override
    public WarehouseSnapshot toToWarehouseSnapshot(StockMovement movement) {
        return new WarehouseSnapshot(
            movement.getToWarehouseId(), 
            movement.getToWarehouseName()
        );
    }

    @Override
    public EmployeeSnapshot toPerformedBySnapshot(StockMovement movement) {
        return new EmployeeSnapshot(
            movement.getPerformedBy(), 
            movement.getPerformedByName()
        );
    }

    @Override
    public EmployeeSnapshot toReviewedBySnapshot(StockMovement movement) {
        return new EmployeeSnapshot(
            movement.getReviewedBy(),
            movement.getReviewedByName()
        );
    }
}
