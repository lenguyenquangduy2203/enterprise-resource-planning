package dev.edu.inventory.adapters.payloads.kpi;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public record WarehouseCount(
    Long warehouseId,
    Long totalMovements
) {
    public static Set<WarehouseCount> from(Map<Long, Long> counter) {
        return counter.entrySet()
            .stream()
            .map(entry -> new WarehouseCount(entry.getKey(), entry.getValue()))
            .collect(Collectors.toSet());
    }
}
