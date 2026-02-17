package dev.edu.catalog.application.errors;

public class RegisterExistingProduct extends RuntimeException {
    public RegisterExistingProduct(String sku) {
        super("Registering existing product with sku: " + sku);
    }
}
