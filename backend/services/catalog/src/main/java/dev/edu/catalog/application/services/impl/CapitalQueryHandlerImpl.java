package dev.edu.catalog.application.services.impl;

import java.util.Set;

import org.springframework.stereotype.Component;

import dev.edu.catalog.application.queries.InStockCapitalProductSnapshotQuery;
import dev.edu.catalog.application.services.CapitalQueryHandler;
import dev.edu.catalog.domain.entities.persistence.Product;
import dev.edu.catalog.domain.repositories.ProductRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CapitalQueryHandlerImpl implements CapitalQueryHandler {
    private final ProductRepository productRepository;
    
    @Override
    public Set<Product> handle(InStockCapitalProductSnapshotQuery query) {
        return productRepository.findAllWithCategoryIn(query.productIds());
    }
}
