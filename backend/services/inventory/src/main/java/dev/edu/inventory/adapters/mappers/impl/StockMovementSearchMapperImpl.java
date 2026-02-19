package dev.edu.inventory.adapters.mappers.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import dev.edu.inventory.adapters.mappers.SnapshotsMapper;
import dev.edu.inventory.adapters.mappers.StockMovementSearchMapper;
import dev.edu.inventory.adapters.payloads.StockMovementResponse;
import dev.edu.inventory.adapters.payloads.StockMovementSearchParams;
import dev.edu.inventory.application.queries.StockMovementsSearchQuery;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class StockMovementSearchMapperImpl implements StockMovementSearchMapper {
    private final SnapshotsMapper snapshotsMapper;

    @Override
    public StockMovementsSearchQuery toStockMovementsSearchQuery(StockMovementSearchParams params, Pageable pageable) {
        return new StockMovementsSearchQuery(
            params.productSku(),
            params.movementType(),
            params.status(),
            params.fromWarehouseId(),
            params.toWarehouseId(),
            params.performedBy(),
            params.createdFrom(),
            params.createdTo(),
            pageable
        );
    }

    @Override
    public Page<StockMovementResponse> toStockMovementResponses(Page<StockMovement> movements) {
        return movements.map(movement -> new StockMovementResponse(
            movement.getId(), 
            snapshotsMapper.toProductSnapshot(movement),
            movement.getMovementType(),
            movement.getStatus(),
            movement.getQuantity(),
            snapshotsMapper.toFromWarehouseSnapshot(movement),
            snapshotsMapper.toToWarehouseSnapshot(movement),
            snapshotsMapper.toPerformedBySnapshot(movement),
            snapshotsMapper.toReviewedBySnapshot(movement),
            movement.getCreatedAt(),
            movement.getUpdatedAt()
        ));
    }
}
