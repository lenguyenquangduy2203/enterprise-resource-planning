package dev.edu.inventory.application.services;

import java.util.List;

import dev.edu.inventory.application.queries.InStockCapitalSnapshotQuery;
import dev.edu.inventory.domain.repositories.projections.InStockCapitalSnapshot;

public interface InStockCapitalSnapshotQueryHandler {
    List<InStockCapitalSnapshot> handle(InStockCapitalSnapshotQuery query);
}
