package dev.edu.inventory.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import dev.edu.inventory.application.queries.InStockCapitalSnapshotQuery;
import dev.edu.inventory.application.services.InStockCapitalSnapshotQueryHandler;
import dev.edu.inventory.domain.repositories.StockRepository;
import dev.edu.inventory.domain.repositories.projections.InStockCapitalSnapshot;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class InStockCapitalSnapshotQueryHandlerImpl implements InStockCapitalSnapshotQueryHandler {
    private final StockRepository stockRepository;
    
    @Override
    public List<InStockCapitalSnapshot> handle(InStockCapitalSnapshotQuery query) {
        return stockRepository.findInStockCapitalSnapshots();
    }
}
