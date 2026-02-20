package dev.edu.catalog.application.services;

import org.springframework.data.domain.Page;

import dev.edu.catalog.application.queries.ProductLookupQuery;
import dev.edu.catalog.domain.repositories.projections.ProductSelection;

public interface LookupQueryHandler {
    Page<ProductSelection> handle(ProductLookupQuery query);
}
