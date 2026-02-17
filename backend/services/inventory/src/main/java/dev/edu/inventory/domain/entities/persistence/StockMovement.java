package dev.edu.inventory.domain.entities.persistence;

import java.time.Instant;
import java.util.UUID;

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
}
