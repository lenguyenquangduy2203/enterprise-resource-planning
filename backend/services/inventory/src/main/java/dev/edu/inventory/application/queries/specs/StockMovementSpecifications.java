package dev.edu.inventory.application.queries.specs;

import java.time.Instant;
import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;

import dev.edu.inventory.application.queries.StockMovementsSearchQuery;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import dev.edu.inventory.domain.values.MovementStatus;
import dev.edu.inventory.domain.values.MovementType;

public final class StockMovementSpecifications {
    private StockMovementSpecifications() {}

    // == SPEC FACTORY ==
    public static Specification<StockMovement> from(StockMovementsSearchQuery query) {
        return Specification
            .where(hasProductSku(query.productSku()))
            .and(hasMovementType(query.movementType()))
            .and(hasStatus(query.status()))
            .and(hasFromWarehouse(query.fromWarehouseId()))
            .and(hasToWarehouse(query.toWarehouseId()))
            .and(hasPerformedBy(query.performedBy()))
            .and(createdFrom(query.createdFrom()))
            .and(createdTo(query.createdTo()));
    }

    // == FILTERS ==

    private static Specification<StockMovement> hasProductSku(String sku) {
        return (root, query, cb) ->
            sku == null ? null :
            cb.like(
                cb.lower(root.get("productSku")),
                "%" + sku.toLowerCase() + "%"
            );
    }

    private static Specification<StockMovement> hasMovementType(MovementType type) {
        return (root, query, cb) ->
            type == null ? null :
            cb.equal(root.get("movementType"), type);
    }

    private static Specification<StockMovement> hasStatus(MovementStatus status) {
        return (root, query, cb) ->
            status == null ? null :
            cb.equal(root.get("status"), status);
    }

    private static Specification<StockMovement> hasFromWarehouse(Long warehouseId) {
        return (root, query, cb) ->
            warehouseId == null ? null :
            cb.equal(root.get("fromWarehouseId"), warehouseId);
    }

    private static Specification<StockMovement> hasToWarehouse(Long warehouseId) {
        return (root, query, cb) ->
            warehouseId == null ? null :
            cb.equal(root.get("toWarehouseId"), warehouseId);
    }

    private static Specification<StockMovement> hasPerformedBy(UUID performedBy) {
        return (root, query, cb) ->
            performedBy == null ? null :
            cb.equal(root.get("performedBy"), performedBy);
    }

    private static Specification<StockMovement> createdFrom(Instant createdFrom) {
        return (root, query, cb) ->
            createdFrom == null ? null :
            cb.greaterThanOrEqualTo(root.get("createdAt"), createdFrom);
    }

    private static Specification<StockMovement> createdTo(Instant createdTo) {
        return (root, query, cb) ->
            createdTo == null ? null :
            cb.lessThanOrEqualTo(root.get("createdAt"), createdTo);
    }
}
