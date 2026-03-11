package dev.edu.inventory.domain.repositories.projections;

public interface InStockCapitalSnapshot {
    Long getId();
    Long getProductId();
    Integer getQuantity();
    String getWarehouseCode();
}
