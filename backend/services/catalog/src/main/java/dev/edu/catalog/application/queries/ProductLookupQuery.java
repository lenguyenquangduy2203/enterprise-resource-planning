package dev.edu.catalog.application.queries;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.edu.catalog.application.contracts.Query;
import dev.edu.catalog.application.services.LookupQueryHandler;
import dev.edu.catalog.domain.repositories.projections.ProductSelection;

public record ProductLookupQuery(
    String sku,
    Pageable pageable
) implements Query<LookupQueryHandler, Page<ProductSelection>> {
    @Override
    public Page<ProductSelection> accept(LookupQueryHandler handler) {
        return handler.handle(this);
    }
}
