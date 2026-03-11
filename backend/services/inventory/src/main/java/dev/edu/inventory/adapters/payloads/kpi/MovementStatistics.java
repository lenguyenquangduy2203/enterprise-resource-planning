package dev.edu.inventory.adapters.payloads.kpi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import dev.edu.inventory.domain.entities.persistence.StockMovement;
import dev.edu.inventory.domain.values.MovementStatus;
import dev.edu.inventory.domain.values.MovementType;

public record MovementStatistics(
    Set<MovementTypeCount> typeDistributions,
    Set<MovementStatusCount> statusDistributions,
    Set<WarehouseCount> warehouseDistributions
) {
    public static MovementStatistics from(List<StockMovement> movements) {
        Map<MovementType, Long> typeCounter = new HashMap<>();
        Map<MovementStatus, Long> statusCounter = new HashMap<>();
        Map<Long, Long> warehouseCounter = new HashMap<>();

        for (StockMovement movement : movements) {
            increment(typeCounter, movement.getMovementType());
            increment(statusCounter, movement.getStatus());

            var fromWarehouseId = movement.getFromWarehouseId();
            if (fromWarehouseId != null && fromWarehouseId > 0) {
                increment(warehouseCounter, fromWarehouseId);
            }

            var toWarehouseId = movement.getToWarehouseId();
            if (toWarehouseId != null && toWarehouseId > 0) {
                increment(warehouseCounter, toWarehouseId);
            }
        }

        return new MovementStatistics(
            MovementTypeCount.from(typeCounter), 
            MovementStatusCount.from(statusCounter),
            WarehouseCount.from(warehouseCounter)
        );
    }

    private static <K> void increment(Map<K, Long> counter, K key) {
        counter.put(key, counter.getOrDefault(key, 0L) + 1);
    }
}
