package dev.edu.catalog.adapters.mappers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.edu.catalog.adapters.payloads.ProductSearchParams;
import dev.edu.catalog.adapters.payloads.ProductSearchResponse;
import dev.edu.catalog.application.queries.SearchProductQuery;
import dev.edu.catalog.domain.entities.persistence.Product;

public interface ProductSearchMapper {
    SearchProductQuery toSearchProductQuery(ProductSearchParams params, Pageable pageable);
    Page<ProductSearchResponse> toProductSearchResponse(Page<Product> products);
}
