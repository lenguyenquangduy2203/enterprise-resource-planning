package dev.edu.inventory.application.errors;

public class WarehouseNotFoundException extends RuntimeException {
    public WarehouseNotFoundException(Long warehouseId) {
        super("Warehouse not found: " + warehouseId);
    }
}
