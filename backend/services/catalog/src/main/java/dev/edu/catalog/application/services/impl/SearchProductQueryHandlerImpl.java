package dev.edu.catalog.application.services.impl;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import dev.edu.catalog.application.queries.SearchProductQuery;
import dev.edu.catalog.application.queries.specs.ProductSpecifications;
import dev.edu.catalog.application.services.SearchProductQueryHandler;
import dev.edu.catalog.domain.entities.persistence.Product;
import dev.edu.catalog.domain.repositories.ProductRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SearchProductQueryHandlerImpl implements SearchProductQueryHandler {
    private final ProductRepository productRepository;

    @Override
    public Page<Product> handle(SearchProductQuery query) {
        return productRepository.findAll(ProductSpecifications.from(query), query.pageable());
    }
}
