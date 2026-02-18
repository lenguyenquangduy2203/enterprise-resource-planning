package dev.edu.inventory.adapters.mappers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.edu.inventory.adapters.payloads.StockMovementResponse;
import dev.edu.inventory.adapters.payloads.StockMovementSearchParams;
import dev.edu.inventory.application.queries.StockMovementsSearchQuery;
import dev.edu.inventory.domain.entities.persistence.StockMovement;

public interface StockMovementSearchMapper {
    StockMovementsSearchQuery toStockMovementsSearchQuery(StockMovementSearchParams params, Pageable pageable);
    Page<StockMovementResponse> toStockMovementResponses(Page<StockMovement> movements);
}
