package dev.edu.inventory.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import dev.edu.inventory.application.queries.OperationalKPIQuery;
import dev.edu.inventory.application.services.OperationalKPIQueryHandler;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import dev.edu.inventory.domain.repositories.StockMovementRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class OperationalKPIQueryHandlerImpl implements OperationalKPIQueryHandler {
    private final StockMovementRepository stockMovementRepository;

    @Override
    public List<StockMovement> handle(OperationalKPIQuery query) {
        var from = query.createdFrom().toInstant();
        var to = query.createdTo().toInstant();

        return stockMovementRepository.findByCreatedAtBetween(from, to);
    }
}
