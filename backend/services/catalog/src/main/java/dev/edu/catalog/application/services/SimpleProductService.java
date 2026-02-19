package dev.edu.catalog.application.services;

import dev.edu.catalog.domain.entities.persistence.Product;

public interface SimpleProductService {
    Product getProductById(Long productId);
}
