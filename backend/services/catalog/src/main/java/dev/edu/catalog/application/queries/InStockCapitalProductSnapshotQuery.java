package dev.edu.catalog.application.queries;

import java.util.Set;

import dev.edu.catalog.application.contracts.Query;
import dev.edu.catalog.application.services.CapitalQueryHandler;
import dev.edu.catalog.domain.entities.persistence.Product;

import jakarta.validation.constraints.Positive;

public record InStockCapitalProductSnapshotQuery(
    Set<@Positive Long> productIds
) implements Query<CapitalQueryHandler, Set<Product>> {
    @Override
    public Set<Product> accept(CapitalQueryHandler handler) {
        return handler.handle(this);
    }
}
