package dev.edu.catalog.adapters.mappers.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import dev.edu.catalog.adapters.mappers.ProductSearchMapper;
import dev.edu.catalog.adapters.payloads.ProductLookupParams;
import dev.edu.catalog.adapters.payloads.ProductSearchParams;
import dev.edu.catalog.adapters.payloads.ProductSearchResponse;
import dev.edu.catalog.application.queries.ProductLookupQuery;
import dev.edu.catalog.application.queries.SearchProductQuery;
import dev.edu.catalog.domain.entities.persistence.Product;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ProductSearchMapperImpl implements ProductSearchMapper {
    @Override
    public SearchProductQuery toSearchProductQuery(ProductSearchParams params, Pageable pageable) {
        return new SearchProductQuery(
            params.name(),
            params.categoryCode(),
            params.manufacturerCode(),
            params.minPrice(),
            params.maxPrice(),
            params.status(),
            pageable
        );
    }

    @Override
    public Page<ProductSearchResponse> toProductSearchResponse(Page<Product> products) {
        return products.map(product -> new ProductSearchResponse(
            product.getSku(), 
            product.getName(), 
            product.getUnit(), 
            product.getUnitPrice(), 
            product.getCategory().getCode(), 
            product.getCategory().getName(), 
            product.getManufacturer().getCode(), 
            product.getManufacturer().getName(), 
            product.getStatus())
        );
    }

    @Override
    public ProductLookupQuery toProductLookupQuery(ProductLookupParams params, Pageable pageable) {
        return new ProductLookupQuery(params.sku(), pageable);
    }
}
