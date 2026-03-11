package dev.edu.inventory.application.queries;

import java.util.List;

import dev.edu.inventory.application.contracts.Query;
import dev.edu.inventory.application.services.InStockCapitalSnapshotQueryHandler;
import dev.edu.inventory.domain.repositories.projections.InStockCapitalSnapshot;

public record InStockCapitalSnapshotQuery() implements Query<InStockCapitalSnapshotQueryHandler, List<InStockCapitalSnapshot>> {
    @Override
    public List<InStockCapitalSnapshot> accept(InStockCapitalSnapshotQueryHandler handler) {
        return handler.handle(this);
    }
}
