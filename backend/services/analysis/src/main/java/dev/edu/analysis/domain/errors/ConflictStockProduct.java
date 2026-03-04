package dev.edu.analysis.domain.errors;

import dev.edu.analysis.domain.clients.payloads.capital.Product;
import dev.edu.analysis.domain.clients.payloads.capital.Stock;

public class ConflictStockProduct extends RuntimeException {
    public ConflictStockProduct(Stock expected, Product actual) {
        super("Expected product id: " + expected.productId() + ". Actually got " + actual.id());
    }
}
