package dev.edu.inventory.domain.entities.persistence;

import java.time.Instant;
import java.util.UUID;

import dev.edu.inventory.domain.clients.payloads.EmployeeStats;
import dev.edu.inventory.domain.clients.payloads.ProductStats;
import dev.edu.inventory.domain.values.MovementStatus;
import dev.edu.inventory.domain.values.MovementType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stock_movement")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class StockMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =====================
    // Product snapshot
    // =====================

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "product_sku", nullable = false, length = 50)
    private String productSku;

    @Column(name = "product_name", nullable = false, length = 150)
    private String productName;

    // =====================
    // Warehouse snapshot
    // =====================

    @Column(name = "from_warehouse_id")
    private Long fromWarehouseId;

    @Column(name = "from_warehouse_name", length = 100)
    private String fromWarehouseName;

    @Column(name = "to_warehouse_id")
    private Long toWarehouseId;

    @Column(name = "to_warehouse_name", length = 100)
    private String toWarehouseName;

    // =====================
    // Movement data
    // =====================

    @Column(nullable = false)
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "movement_type", nullable = false, length = 50)
    private MovementType movementType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private MovementStatus status;

    // =====================
    // Employee snapshot
    // =====================

    @Column(name = "performed_by", columnDefinition = "BINARY(16)")
    private UUID performedBy;

    @Column(name = "performed_by_name", length = 150)
    private String performedByName;

    @Column(name = "reviewed_by", columnDefinition = "BINARY(16)")
    private UUID reviewedBy;

    @Column(name = "reviewed_by_name", length = 150)
    private String reviewedByName;

    // =====================
    // Auditing
    // =====================

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    public void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = Instant.now();
    }

    private static StockMovement createMovement(
        EmployeeStats performer,
        ProductStats product,
        Integer quantity,
        MovementType type
    ) {
        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }

        StockMovement movement = new StockMovement();

        // Product snapshot
        movement.productId = product.id();
        movement.productSku = product.sku();
        movement.productName = product.name();

        // Employee snapshot
        movement.performedBy = performer.id();
        movement.performedByName = performer.name();

        // Movement
        movement.quantity = quantity;
        movement.movementType = type;
        movement.status = MovementStatus.PENDING;

        return movement;
    }

    public static StockMovement stockImport(
        EmployeeStats performer,
        ProductStats product,
        Warehouse toWarehouse,
        Integer quantity
    ) {
        StockMovement movement = createMovement(
            performer,
            product,
            quantity,
            MovementType.IMPORT
        );

        movement.toWarehouseId = toWarehouse.getId();
        movement.toWarehouseName = toWarehouse.getName();

        movement.fromWarehouseId = null;
        movement.fromWarehouseName = null;

        return movement;
    }

    public static StockMovement stockExport(
        EmployeeStats performer, 
        ProductStats product, 
        Warehouse fromWarehouse,
        Integer quantity
    ) {
        StockMovement movement = createMovement(
            performer,
            product,
            quantity,
            MovementType.EXPORT
        );

        movement.fromWarehouseId = fromWarehouse.getId();
        movement.fromWarehouseName = fromWarehouse.getName();

        movement.toWarehouseId = null;
        movement.toWarehouseName = null;

        return movement;
    }

    public static StockMovement stockTransfer(
        EmployeeStats performer, 
        ProductStats product, 
        Warehouse fromWarehouse,
        Warehouse toWarehouse,
        Integer quantity
    ) {
        if (fromWarehouse.getId().equals(toWarehouse.getId())) {
            throw new IllegalArgumentException("Cannot transfer to the same warehouse");
        }

        StockMovement movement = createMovement(
            performer,
            product,
            quantity,
            MovementType.TRANSFER
        );

        movement.fromWarehouseId = fromWarehouse.getId();
        movement.fromWarehouseName = fromWarehouse.getName();

        movement.toWarehouseId = toWarehouse.getId();
        movement.toWarehouseName = toWarehouse.getName();

        return movement;
    }

    public static StockMovement stockAdjust(
        EmployeeStats performer, 
        ProductStats product, 
        Warehouse warehouse,
        Integer quantity
    ) {
        StockMovement movement = createMovement(
            performer,
            product,
            quantity,
            MovementType.ADJUSTMENT
        );

        movement.fromWarehouseId = warehouse.getId();
        movement.fromWarehouseName = warehouse.getName();

        movement.toWarehouseId = null;
        movement.toWarehouseName = null;

        return movement;
    }
}
