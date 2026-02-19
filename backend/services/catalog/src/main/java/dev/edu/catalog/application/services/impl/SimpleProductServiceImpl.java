package dev.edu.catalog.application.services.impl;

import org.springframework.stereotype.Service;

import dev.edu.catalog.application.services.SimpleProductService;
import dev.edu.catalog.application.errors.ProductNotFound;
import dev.edu.catalog.domain.entities.persistence.Product;
import dev.edu.catalog.domain.repositories.ProductRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SimpleProductServiceImpl implements SimpleProductService {
    private final ProductRepository productRepository;
    
    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
            .orElseThrow(() -> new ProductNotFound(productId));
    }
}
