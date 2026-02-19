package dev.edu.inventory.application.services.impl;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import dev.edu.inventory.application.queries.StockMovementsSearchQuery;
import dev.edu.inventory.application.queries.specs.StockMovementSpecifications;
import dev.edu.inventory.application.services.StockMovementsSearchQueryHandler;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import dev.edu.inventory.domain.repositories.StockMovementRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class StockMovementsSearchQueryHandlerImpl implements StockMovementsSearchQueryHandler {
    private final StockMovementRepository stockMovementRepository;

    @Override
    public Page<StockMovement> handle(StockMovementsSearchQuery query) {
        return stockMovementRepository.findAll(StockMovementSpecifications.from(query), query.pageable());
    }
}
