package dev.edu.catalog.application.errors;

public class ProductNotFound extends RuntimeException {
    public ProductNotFound(Long productId) {
        super("Product not found: " + productId);
    }
}
