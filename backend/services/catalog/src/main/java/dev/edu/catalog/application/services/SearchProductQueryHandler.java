package dev.edu.catalog.application.services;

import org.springframework.data.domain.Page;

import dev.edu.catalog.application.queries.SearchProductQuery;
import dev.edu.catalog.domain.entities.persistence.Product;

public interface SearchProductQueryHandler {
    Page<Product> handle(SearchProductQuery query);
}
