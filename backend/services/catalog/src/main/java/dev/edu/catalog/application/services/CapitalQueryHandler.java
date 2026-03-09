package dev.edu.catalog.application.services;

import java.util.Set;

import dev.edu.catalog.application.queries.InStockCapitalProductSnapshotQuery;
import dev.edu.catalog.domain.entities.persistence.Product;

public interface CapitalQueryHandler {
    Set<Product> handle(InStockCapitalProductSnapshotQuery query);
}
