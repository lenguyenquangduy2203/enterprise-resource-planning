package dev.edu.catalog.application.services.impl;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import dev.edu.catalog.application.queries.ProductLookupQuery;
import dev.edu.catalog.application.queries.specs.ProductSpecifications;
import dev.edu.catalog.application.services.LookupQueryHandler;
import dev.edu.catalog.domain.repositories.ProductRepository;
import dev.edu.catalog.domain.repositories.projections.ProductSelection;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class LookupQueryHandlerImpl implements LookupQueryHandler {
    private final ProductRepository productRepository;

    @Override
    public Page<ProductSelection> handle(ProductLookupQuery query) {
        return productRepository.findAll(
            ProductSpecifications.from(query), 
            query.pageable(),
            ProductSelection.class
        );
    }
}
