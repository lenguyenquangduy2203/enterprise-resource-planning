package dev.edu.inventory.application.errors;

public class ProductInactiveException extends RuntimeException {
    public ProductInactiveException(Long productId) {
        super("Product is not active: " + productId);
    }
}
