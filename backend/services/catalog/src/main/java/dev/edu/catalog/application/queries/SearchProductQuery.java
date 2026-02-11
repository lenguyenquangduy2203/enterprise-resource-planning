package dev.edu.catalog.application.queries;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.edu.catalog.application.contracts.Query;
import dev.edu.catalog.application.services.SearchProductQueryHandler;
import dev.edu.catalog.domain.entities.persistence.Product;
import dev.edu.catalog.domain.values.ProductStatus;

public record SearchProductQuery(
    String name,
    String categoryCode,
    String manufacturerCode,
    BigDecimal minPrice,
    BigDecimal maxPrice,
    ProductStatus status,
    Pageable pageable
) implements Query<SearchProductQueryHandler, Page<Product>> {
    @Override
    public Page<Product> accept(SearchProductQueryHandler handler) {
        return handler.handle(this);
    }
}
